package docker

# Deny use of the latest Docker tag in policy enforcement

default tag_allowed = false

tag_allowed {
  input.image != "latest"
}
