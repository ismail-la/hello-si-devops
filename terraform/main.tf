terraform {
  required_providers {
    docker = { source = "kreuzwerker/docker", version = "~>3.0" }
  }
}
provider "docker" {}

resource "docker_image" "hello_si" {
  name = "${var.dockerhub_user}/hello-si:latest"
}
resource "docker_container" "hello_si" {
  image = docker_image.hello_si.name
  name  = "hello-si"

  ports { internal = 3000 external = 3000 }
}
