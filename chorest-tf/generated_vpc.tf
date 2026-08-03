# __generated__ by Terraform
# Please review these resources and move them into your main configuration files.

# __generated__ by Terraform from aws_apigatewayv2_domain_name.chorest-api-domain-name.id
resource "aws_apigatewayv2_domain_name" "chorest-api-domain-name" {
  domain_name = "api.chorest.shop"
  region      = "us-east-2"
  tags        = {}
  tags_all    = {}
  domain_name_configuration {
    certificate_arn = "arn:aws:acm:us-east-2:004058506860:certificate/19554380-bbef-422a-8f42-5303f24ac540"
    endpoint_type   = "REGIONAL"
    ip_address_type = "ipv4"
    security_policy = "TLS_1_2"
  }
}

# __generated__ by Terraform
resource "aws_lb_listener" "http-80-listener" {
  alpn_policy                          = null
  certificate_arn                      = null
  load_balancer_arn                    = aws_lb.chorest-alb.arn
  port                                 = 80
  protocol                             = "HTTP"
  region                               = "us-east-2"
  routing_http_response_server_enabled = true
  tags                                 = {}
  tags_all                             = {}
  default_action {
    order            = 1
    target_group_arn = aws_lb_target_group.chorest-backend-tg.arn
    type             = "forward"
    forward {
      stickiness {
        duration = 3600
        enabled  = false
      }
      target_group {
        arn    = aws_lb_target_group.chorest-backend-tg.arn
        weight = 1
      }
    }
  }
}

# __generated__ by Terraform from "subnet-03c07377329914896/rtb-0125a25e39d55a045"
resource "aws_route_table_association" "private-assoc1" {
  gateway_id     = null
  region         = "us-east-2"
  route_table_id = aws_route_table.private-rt.id
  subnet_id      = aws_subnet.private-subnet-03.id
}

# __generated__ by Terraform from aws_security_group.chorest-backend-sg.id
resource "aws_security_group" "chorest-backend-sg" {
  name        = "chorest-backend-sg"
  description = "allows ssh and requests from alb"
  vpc_id      = aws_vpc.main.id
}

resource "aws_vpc_security_group_egress_rule" "backend_to_db_5432" {
  security_group_id            = aws_security_group.chorest-backend-sg.id
  referenced_security_group_id = aws_security_group.chorest-db-sg.id
  from_port                    = 5432
  to_port                      = 5432
  ip_protocol                  = "tcp"
}

resource "aws_vpc_security_group_ingress_rule" "backend_from_alb_8080" {
  security_group_id            = aws_security_group.chorest-backend-sg.id
  referenced_security_group_id = aws_security_group.chorest-alb-sg.id
  from_port                    = 8080
  to_port                      = 8080
  ip_protocol                  = "tcp"
}

resource "aws_vpc_security_group_ingress_rule" "backend_from_connect_22" {
  security_group_id            = aws_security_group.chorest-backend-sg.id
  referenced_security_group_id = aws_security_group.ec2-instance-connect-sg.id
  from_port                    = 22
  to_port                      = 22
  ip_protocol                  = "tcp"
}

# __generated__ by Terraform
resource "aws_subnet" "public-subnet-03" {
  assign_ipv6_address_on_creation                = false
  availability_zone                              = "us-east-2b"
  cidr_block                                     = "172.31.16.0/20"
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_cidr_block                                = null
  ipv6_native                                    = false
  map_public_ip_on_launch                        = true
  private_dns_hostname_type_on_launch            = "ip-name"
  region                                         = "us-east-2"
  tags                                           = {Name = "public-subnet-03"}
  tags_all                                       = {}
  vpc_id                                         = aws_vpc.main.id
}

# __generated__ by Terraform from "subnet-0e9f41a4fb43651dc/rtb-0125a25e39d55a045"
resource "aws_route_table_association" "private-assoc2" {
  gateway_id     = null
  region         = "us-east-2"
  route_table_id = aws_route_table.private-rt.id
  subnet_id      = aws_subnet.private-subnet-02.id
}

# __generated__ by Terraform
resource "aws_subnet" "public-subnet-02" {
  assign_ipv6_address_on_creation                = false
  availability_zone                              = "us-east-2a"
  cidr_block                                     = "172.31.0.0/20"
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_cidr_block                                = null
  ipv6_native                                    = false
  map_public_ip_on_launch                        = true
  private_dns_hostname_type_on_launch            = "ip-name"
  region                                         = "us-east-2"
  tags                                           = {Name = "public-subnet-02"}
  tags_all                                       = {}
  vpc_id                                         = aws_vpc.main.id
}

# __generated__ by Terraform from "launch-wizard-2"
resource "aws_security_group" "launch-wizard-2" {
  name        = "launch-wizard-2"
  description = "launch-wizard-2 created 2025-06-25T22:00:13.021Z"
  vpc_id      = aws_vpc.main.id
  tags        = {}
}

resource "aws_default_security_group" "default" {
  vpc_id      = aws_vpc.main.id
  tags        = {}
}

# Egress: Allow all outbound
resource "aws_vpc_security_group_egress_rule" "lw2_all_out" {
  security_group_id = aws_security_group.launch-wizard-2.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # All protocols
}

# Ingress: Allow all protocols from anywhere
resource "aws_vpc_security_group_ingress_rule" "lw2_all_in" {
  security_group_id = aws_security_group.launch-wizard-2.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

# Ingress: SSH
resource "aws_vpc_security_group_ingress_rule" "lw2_ssh" {
  security_group_id = aws_security_group.launch-wizard-2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
}

# Ingress: Custom 3000
resource "aws_vpc_security_group_ingress_rule" "lw2_3000" {
  security_group_id = aws_security_group.launch-wizard-2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 3000
  to_port           = 3000
  ip_protocol       = "tcp"
}

# Ingress: HTTPS
resource "aws_vpc_security_group_ingress_rule" "lw2_https" {
  security_group_id = aws_security_group.launch-wizard-2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  to_port           = 443
  ip_protocol       = "tcp"
}

# Ingress: Custom 8080
resource "aws_vpc_security_group_ingress_rule" "lw2_8080" {
  security_group_id = aws_security_group.launch-wizard-2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 8080
  to_port           = 8080
  ip_protocol       = "tcp"
}

# Ingress: HTTP from Default SG (The previous Cycle point)
resource "aws_vpc_security_group_ingress_rule" "lw2_http_from_default" {
  security_group_id            = aws_security_group.launch-wizard-2.id
  referenced_security_group_id = aws_default_security_group.default.id
  from_port                    = 80
  to_port                      = 80
  ip_protocol                  = "tcp"
}

# Ingress: PostgreSQL from Self
resource "aws_vpc_security_group_ingress_rule" "lw2_postgres_self" {
  security_group_id            = aws_security_group.launch-wizard-2.id
  referenced_security_group_id = aws_security_group.launch-wizard-2.id
  from_port                    = 5432
  to_port                      = 5432
  ip_protocol                  = "tcp"
}

# __generated__ by Terraform from "vpce-04c935f0650aa1c52"
resource "aws_vpc_endpoint" "ecs-dkr" {
  auto_accept     = null
  ip_address_type = "ipv4"
  policy = jsonencode({
    Statement = [{
      Action    = "*"
      Effect    = "Allow"
      Principal = "*"
      Resource  = "*"
    }]
  })
  private_dns_enabled        = true
  region                     = "us-east-2"
  resource_configuration_arn = null
  route_table_ids            = []
  security_group_ids         = [aws_default_security_group.default.id]
  service_name               = "com.amazonaws.us-east-2.ecr.dkr"
  service_network_arn        = null
  service_region             = "us-east-2"
  subnet_ids                 = [aws_subnet.public-subnet-02.id]
  tags = {
    Name = "ecr-dkr"
  }
  tags_all = {
    Name = "ecr-dkr"
  }
  vpc_endpoint_type = "Interface"
  vpc_id            = aws_vpc.main.id
  dns_options {
    dns_record_ip_type                             = "ipv4"
    private_dns_only_for_inbound_resolver_endpoint = false
  }
  subnet_configuration {
    ipv4      = "172.31.3.76"
    ipv6      = null
    subnet_id = aws_subnet.public-subnet-02.id
  }
}

# __generated__ by Terraform from "subnet-0075295de132ab146/rtb-00c65ee26eecde9bb"
resource "aws_route_table_association" "public-assoc2" {
  gateway_id     = null
  region         = "us-east-2"
  route_table_id = aws_default_route_table.public-rt.id
  subnet_id      = aws_subnet.public-subnet-03.id
}

# __generated__ by Terraform from aws_cloudfront_distribution.chorest-cf.id
resource "aws_cloudfront_distribution" "chorest-cf" {
  aliases             = ["chorest.shop", "www.chorest.shop"]
  anycast_ip_list_id  = null
  comment             = null
  default_root_object = "index.html"
  enabled             = true
  http_version        = "http2"
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"
  retain_on_delete    = false
  staging             = false
  tags = {
    Name = "chorest-cf"
  }
  tags_all = {
    Name = "chorest-cf"
  }
  wait_for_deployment = true
  web_acl_id          = "arn:aws:wafv2:us-east-1:004058506860:global/webacl/CreatedByCloudFront-15373b2d/4c4aa4ba-b4ea-4b1f-a10c-73e9a036d152"
  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }
  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }
  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD"]
    cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    default_ttl                = 0
    field_level_encryption_id  = null
    max_ttl                    = 0
    min_ttl                    = 0
    origin_request_policy_id   = null
    realtime_log_config_arn    = null
    response_headers_policy_id = null
    smooth_streaming           = false
    target_origin_id           = "chorest.shop.s3.us-east-2.amazonaws.com-mhqswq4l308"
    trusted_key_groups         = []
    trusted_signers            = []
    viewer_protocol_policy     = "redirect-to-https"
    grpc_config {
      enabled = false
    }
  }
  ordered_cache_behavior {
    allowed_methods            = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cache_policy_id            = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    default_ttl                = 0
    field_level_encryption_id  = null
    max_ttl                    = 0
    min_ttl                    = 0
    origin_request_policy_id   = "b689b0a8-53d0-40ab-baf2-68738e2966ac"
    path_pattern               = "/api/*"
    realtime_log_config_arn    = null
    response_headers_policy_id = null
    smooth_streaming           = false
    target_origin_id           = aws_apigatewayv2_domain_name.chorest-api-domain-name.id
    trusted_key_groups         = []
    trusted_signers            = []
    viewer_protocol_policy     = "redirect-to-https"
    grpc_config {
      enabled = false
    }
  }
  origin {
    connection_attempts         = 3
    connection_timeout          = 10
    domain_name                 = aws_apigatewayv2_domain_name.chorest-api-domain-name.id
    origin_access_control_id    = null
    origin_id                   = aws_apigatewayv2_domain_name.chorest-api-domain-name.id
    origin_path                 = "/default"
    response_completion_timeout = 0
    custom_origin_config {
      http_port                = 80
      https_port               = 443
      ip_address_type          = "ipv4"
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "https-only"
      origin_read_timeout      = 30
      origin_ssl_protocols     = ["TLSv1.2"]
    }
  }
  origin {
    connection_attempts         = 3
    connection_timeout          = 10
    domain_name                 = "chorest.shop.s3.us-east-2.amazonaws.com"
    origin_access_control_id    = "E1G1JAOLQAD8D2"
    origin_id                   = "chorest.shop.s3.us-east-2.amazonaws.com-mhqswq4l308"
    origin_path                 = null
    response_completion_timeout = 0
  }
  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn            = "arn:aws:acm:us-east-1:004058506860:certificate/a213c548-829e-46e9-8f31-a532413e8b20"
    cloudfront_default_certificate = false
    iam_certificate_id             = null
    minimum_protocol_version       = "TLSv1.2_2021"
    ssl_support_method             = "sni-only"
  }
}

# __generated__ by Terraform
resource "aws_subnet" "public-subnet-01" {
  assign_ipv6_address_on_creation                = false
  availability_zone                              = "us-east-2c"
  cidr_block                                     = "172.31.32.0/20"
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_cidr_block                                = null
  ipv6_native                                    = false
  map_public_ip_on_launch                        = true
  private_dns_hostname_type_on_launch            = "ip-name"
  region                                         = "us-east-2"
  tags                                           = {Name = "public-subnet-01"}
  tags_all                                       = {}
  vpc_id                                         = aws_vpc.main.id
}

# __generated__ by Terraform from aws_security_group.ec2-instance-connect-sg.id
resource "aws_security_group" "ec2-instance-connect-sg" {
  name        = "ec2-instance-connect-sg"
  description = "allows ssh access"
  vpc_id      = aws_vpc.main.id
}

# Instance Connect Rules
resource "aws_vpc_security_group_ingress_rule" "connect_from_my_ip" {
  security_group_id = aws_security_group.ec2-instance-connect-sg.id
  cidr_ipv4         = "98.5.240.183/32"
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
}

resource "aws_vpc_security_group_egress_rule" "connect_to_backend_22" {
  security_group_id            = aws_security_group.ec2-instance-connect-sg.id
  referenced_security_group_id = aws_security_group.chorest-backend-sg.id
  from_port                    = 22
  to_port                      = 22
  ip_protocol                  = "tcp"
}

resource "aws_vpc_security_group_egress_rule" "connect_to_db_22" {
  security_group_id            = aws_security_group.ec2-instance-connect-sg.id
  referenced_security_group_id = aws_security_group.chorest-db-sg.id
  from_port                    = 22
  to_port                      = 22
  ip_protocol                  = "tcp"
}

# __generated__ by Terraform from "vpce-05d0444697e7137c0"
resource "aws_vpc_endpoint" "ecs-telemetry" {
  auto_accept     = null
  ip_address_type = "ipv4"
  policy = jsonencode({
    Statement = [{
      Action    = "*"
      Effect    = "Allow"
      Principal = "*"
      Resource  = "*"
    }]
  })
  private_dns_enabled        = true
  region                     = "us-east-2"
  resource_configuration_arn = null
  route_table_ids            = []
  security_group_ids         = [aws_default_security_group.default.id]
  service_name               = "com.amazonaws.us-east-2.ecs-telemetry"
  service_network_arn        = null
  service_region             = "us-east-2"
  subnet_ids                 = [aws_subnet.public-subnet-02.id]
  tags = {
    Name = "ecs-telemetry"
  }
  tags_all = {
    Name = "ecs-telemetry"
  }
  vpc_endpoint_type = "Interface"
  vpc_id            = aws_vpc.main.id
  dns_options {
    dns_record_ip_type                             = "ipv4"
    private_dns_only_for_inbound_resolver_endpoint = false
  }
  subnet_configuration {
    ipv4      = "172.31.4.189"
    ipv6      = null
    subnet_id = aws_subnet.public-subnet-02.id
  }
}

resource "aws_lb_target_group_attachment" "backend_tg_attachment" {
  target_group_arn = aws_lb_target_group.chorest-backend-tg.arn
  target_id        = aws_instance.chorest-backend.id
  port             = 8080
}

# __generated__ by Terraform
resource "aws_lb_target_group" "chorest-backend-tg" {
  deregistration_delay               = "300"
  ip_address_type                    = "ipv4"
  lambda_multi_value_headers_enabled = null
  load_balancing_algorithm_type      = "round_robin"
  load_balancing_anomaly_mitigation  = "off"
  load_balancing_cross_zone_enabled  = "use_load_balancer_configuration"
  name                               = "chorest-backend-tg"
  port                               = 8080
  protocol                           = "HTTP"
  protocol_version                   = "HTTP1"
  proxy_protocol_v2                  = null
  region                             = "us-east-2"
  slow_start                         = 0
  tags                               = {}
  tags_all                           = {}
  target_type                        = "instance"
  vpc_id                             = aws_vpc.main.id
  health_check {
    enabled             = true
    healthy_threshold   = 5
    interval            = 300
    matcher             = "200"
    path                = "/api/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }
  stickiness {
    cookie_duration = 86400
    cookie_name     = null
    enabled         = false
    type            = "lb_cookie"
  }
  target_group_health {
    dns_failover {
      minimum_healthy_targets_count      = "1"
      minimum_healthy_targets_percentage = "off"
    }
    unhealthy_state_routing {
      minimum_healthy_targets_count      = 1
      minimum_healthy_targets_percentage = "off"
    }
  }
}

# __generated__ by Terraform
resource "aws_lb" "chorest-alb" {
  client_keep_alive                           = 3600
  desync_mitigation_mode                      = "defensive"
  dns_record_client_routing_policy            = null
  drop_invalid_header_fields                  = false
  enable_cross_zone_load_balancing            = true
  enable_deletion_protection                  = false
  enable_http2                                = true
  enable_tls_version_and_cipher_suite_headers = false
  enable_waf_fail_open                        = false
  enable_xff_client_port                      = false
  enable_zonal_shift                          = false
  idle_timeout                                = 60
  internal                                    = true
  ip_address_type                             = "ipv4"
  load_balancer_type                          = "application"
  name                                        = "chorest-alb"
  preserve_host_header                        = false
  region                                      = "us-east-2"
  security_groups                             = [aws_security_group.chorest-alb-sg.id]
  subnets                                     = [aws_subnet.public-subnet-03.id, aws_subnet.public-subnet-02.id, aws_subnet.public-subnet-01.id]
  tags                                        = {}
  tags_all                                    = {}
  xff_header_processing_mode                  = "append"
  access_logs {
    bucket  = ""
    enabled = false
    prefix  = null
  }
  connection_logs {
    bucket  = ""
    enabled = false
    prefix  = null
  }
  health_check_logs {
    bucket  = ""
    enabled = false
    prefix  = null
  }
}

# __generated__ by Terraform
resource "aws_subnet" "private-subnet-03" {
  assign_ipv6_address_on_creation                = false
  availability_zone                              = "us-east-2c"
  cidr_block                                     = "172.31.80.0/20"
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_cidr_block                                = null
  ipv6_native                                    = false
  map_public_ip_on_launch                        = false
  private_dns_hostname_type_on_launch            = "ip-name"
  region                                         = "us-east-2"
  tags = {
    Name = "private-subnet-03"
  }
  tags_all = {
    Name = "private-subnet-03"
  }
  vpc_id = aws_vpc.main.id
}

# __generated__ by Terraform from aws_apigatewayv2_vpc_link.chorest-vpc-link.id
resource "aws_apigatewayv2_vpc_link" "chorest-vpc-link" {
  name               = "chorest-vpc-link"
  region             = "us-east-2"
  security_group_ids = [aws_security_group.launch-wizard-2.id]
  subnet_ids         = [aws_subnet.public-subnet-03.id, aws_subnet.public-subnet-02.id, aws_subnet.public-subnet-01.id]
  tags               = {}
  tags_all           = {}
}

# __generated__ by Terraform from aws_apigatewayv2_route.any.id
resource "aws_apigatewayv2_route" "any" {
  api_id                              = aws_apigatewayv2_api.chorest-api.id
  api_key_required                    = false
  authorization_scopes                = []
  authorization_type                  = "NONE"
  authorizer_id                       = null
  model_selection_expression          = null
  operation_name                      = null
  region                              = "us-east-2"
  request_models                      = {}
  route_key                           = "ANY /{proxy+}"
  route_response_selection_expression = null
  target                              = "integrations/${aws_apigatewayv2_integration.options-integration.id}"
  depends_on = [ aws_apigatewayv2_integration.options-integration ]
}

# __generated__ by Terraform from aws_apigatewayv2_api.chorest-api.id
resource "aws_apigatewayv2_api" "chorest-api" {
  api_key_selection_expression = "$request.header.x-api-key"
  body                         = null
  credentials_arn              = null
  description                  = null
  disable_execute_api_endpoint = false
  fail_on_warnings             = null
  ip_address_type              = "ipv4"
  name                         = "chorest-api"
  protocol_type                = "HTTP"
  region                       = "us-east-2"
  route_key                    = null
  route_selection_expression   = "$request.method $request.path"
  tags                         = {}
  tags_all                     = {}
  target                       = null
  version                      = null
}

# Egress: All outbound to Launch-Wizard-2 (The previous Cycle point)
resource "aws_vpc_security_group_egress_rule" "default_to_lw2" {
  security_group_id            = aws_default_security_group.default.id
  referenced_security_group_id = aws_security_group.launch-wizard-2.id
  ip_protocol                  = "-1"
}

# Ingress: All from Launch-Wizard-2 (The previous Cycle point)
resource "aws_vpc_security_group_ingress_rule" "default_from_lw2" {
  security_group_id            = aws_default_security_group.default.id
  referenced_security_group_id = aws_security_group.launch-wizard-2.id
  ip_protocol                  = "-1"
}

# Ingress: Self-reference (All traffic)
resource "aws_vpc_security_group_ingress_rule" "default_self" {
  security_group_id            = aws_default_security_group.default.id
  referenced_security_group_id = aws_default_security_group.default.id
  ip_protocol                  = "-1"
}

# __generated__ by Terraform from "subnet-0dd61a77843b58fba/rtb-00c65ee26eecde9bb"
resource "aws_route_table_association" "public-assoc3" {
  gateway_id     = null
  region         = "us-east-2"
  route_table_id = aws_default_route_table.public-rt.id
  subnet_id      = aws_subnet.public-subnet-01.id
}

# __generated__ by Terraform from aws_security_group.chorest-db-sg.id
resource "aws_security_group" "chorest-db-sg" {
  name        = "chorest-db-sg"
  description = "allows ssh and backend comms"
  vpc_id      = aws_vpc.main.id
}

# Database Rules
resource "aws_vpc_security_group_ingress_rule" "db_from_backend_5432" {
  security_group_id            = aws_security_group.chorest-db-sg.id
  referenced_security_group_id = aws_security_group.chorest-backend-sg.id
  description                  = "for backend-db comms"
  from_port                    = 5432
  to_port                      = 5432
  ip_protocol                  = "tcp"
}

resource "aws_vpc_security_group_ingress_rule" "db_from_connect_22" {
  security_group_id            = aws_security_group.chorest-db-sg.id
  referenced_security_group_id = aws_security_group.ec2-instance-connect-sg.id
  from_port                    = 22
  to_port                      = 22
  ip_protocol                  = "tcp"
}

# __generated__ by Terraform from "rtb-0125a25e39d55a045"
resource "aws_route_table" "private-rt" {
  propagating_vgws = []
  region           = "us-east-2"
  route            = []
  tags = {
    Name = "private-route-table"
  }
  tags_all = {
    Name = "private-route-table"
  }
  vpc_id = aws_vpc.main.id
}

# __generated__ by Terraform from "sg-0b7f5bd4c160ef163"
resource "aws_security_group" "ecs-endpoints-sg" {
  description = "allows ecs endpoints to communicate with ecs agent and ecs service"
  egress = [{
    cidr_blocks      = ["0.0.0.0/0"]
    description      = ""
    from_port        = 0
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    protocol         = "-1"
    security_groups  = []
    self             = false
    to_port          = 0
  }]
  ingress = [{
    cidr_blocks      = ["0.0.0.0/0"]
    description      = ""
    from_port        = 0
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    protocol         = "-1"
    security_groups  = []
    self             = false
    to_port          = 0
  }]
  name                   = "ecs-endpoints-sg"
  region                 = "us-east-2"
  revoke_rules_on_delete = null
  tags                   = {}
  tags_all               = {}
  vpc_id                 = aws_vpc.main.id
}

# __generated__ by Terraform
resource "aws_subnet" "private-subnet-02" {
  assign_ipv6_address_on_creation                = false
  availability_zone                              = "us-east-2b"
  cidr_block                                     = "172.31.64.0/20"
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_cidr_block                                 = null
  ipv6_native                                    = false
  map_public_ip_on_launch                        = false
  private_dns_hostname_type_on_launch            = "ip-name"
  region                                         = "us-east-2"
  tags = {
    Name = "private-subnet-02"
  }
  tags_all = {
    Name = "private-subnet-02"
  }
  vpc_id = aws_vpc.main.id
}

# __generated__ by Terraform
resource "aws_subnet" "private-subnet-01" {
  assign_ipv6_address_on_creation                = false
  availability_zone                              = "us-east-2a"
  cidr_block                                     = "172.31.48.0/20"
  enable_dns64                                   = false
  enable_resource_name_dns_a_record_on_launch    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  ipv6_cidr_block                                = null
  ipv6_native                                    = false
  map_public_ip_on_launch                        = false
  private_dns_hostname_type_on_launch            = "ip-name"
  region                                         = "us-east-2"
  tags = {
    Name = "private-subnet-01"
  }
  tags_all = {
    Name = "private-subnet-01"
  }
  vpc_id = aws_vpc.main.id
}

# __generated__ by Terraform from "igw-0267ec03c7ac3f564"
resource "aws_internet_gateway" "igw" {
  region   = "us-east-2"
  tags     = {Name = "chorest-igw"}
  tags_all = {}
  vpc_id   = aws_vpc.main.id
}

# __generated__ by Terraform from "subnet-05da0904e5df53b54/rtb-00c65ee26eecde9bb"
resource "aws_route_table_association" "public-assoc1" {
  gateway_id     = null
  region         = "us-east-2"
  route_table_id = aws_default_route_table.public-rt.id
  subnet_id      = aws_subnet.public-subnet-02.id
}

# __generated__ by Terraform
resource "aws_default_route_table" "public-rt" {
  default_route_table_id = aws_vpc.main.default_route_table_id
  propagating_vgws = []
  region           = "us-east-2"
  route {
    cidr_block                 = "0.0.0.0/0"
    core_network_arn           = ""
    destination_prefix_list_id = ""
    egress_only_gateway_id     = ""
    gateway_id                 = aws_internet_gateway.igw.id
    nat_gateway_id             = ""
    network_interface_id       = ""
    transit_gateway_id         = ""
    vpc_endpoint_id            = ""
    vpc_peering_connection_id  = ""
  }
  tags     = {Name = "public-route-table"}
  tags_all = {}
  lifecycle {
    prevent_destroy = true
  }
}

# __generated__ by Terraform from aws_apigatewayv2_stage.default.id
resource "aws_apigatewayv2_stage" "default" {
  api_id                = aws_apigatewayv2_api.chorest-api.id
  auto_deploy           = true
  client_certificate_id = null
  description           = null
  name                  = "$default"
  region                = "us-east-2"
  stage_variables       = {}
  tags                  = {}
  tags_all              = {}
  default_route_settings {
    data_trace_enabled       = false
    detailed_metrics_enabled = false
    throttling_burst_limit   = 0
    throttling_rate_limit    = 0
  }
}

# __generated__ by Terraform from "eice-0428ac356ad972eab"
resource "aws_ec2_instance_connect_endpoint" "ec2-instance-connect" {
  ip_address_type    = "ipv4"
  preserve_client_ip = false
  region             = "us-east-2"
  security_group_ids = [aws_security_group.ec2-instance-connect-sg.id]
  subnet_id          = aws_subnet.public-subnet-02.id
  tags = {
    Name = "ec2-instance-connect"
  }
}

# __generated__ by Terraform from "chorest-alb-sg"
resource "aws_security_group" "chorest-alb-sg" {
  name        = "chorest-alb-sg"
  description = "allow alb to pass data to backend ec2"
  vpc_id      = aws_vpc.main.id
}

# ALB Rules
resource "aws_vpc_security_group_egress_rule" "alb_to_backend_all" {
  security_group_id            = aws_security_group.chorest-alb-sg.id
  referenced_security_group_id = aws_security_group.chorest-backend-sg.id
  ip_protocol                  = "-1"
}

resource "aws_vpc_security_group_ingress_rule" "alb_from_lw2" {
  security_group_id            = aws_security_group.chorest-alb-sg.id
  referenced_security_group_id = aws_security_group.launch-wizard-2.id
  ip_protocol                  = "-1"
}

resource "aws_vpc_security_group_ingress_rule" "alb_from_default" {
  security_group_id            = aws_security_group.chorest-alb-sg.id
  referenced_security_group_id = aws_default_security_group.default.id
  ip_protocol                  = "-1"
}

# __generated__ by Terraform
resource "aws_vpc" "main" {
  assign_generated_ipv6_cidr_block     = false
  cidr_block                           = "172.31.0.0/16"
  enable_dns_hostnames                 = true
  enable_dns_support                   = true
  enable_network_address_usage_metrics = false
  instance_tenancy                     = "default"
  ipv4_ipam_pool_id                    = null
  ipv4_netmask_length                  = null
  ipv6_ipam_pool_id                    = null
  region                               = "us-east-2"
  tags                                 = {}
  tags_all                             = {}
}

# __generated__ by Terraform from aws_apigatewayv2_route.options.id
resource "aws_apigatewayv2_route" "options" {
  api_id                              = aws_apigatewayv2_api.chorest-api.id
  api_key_required                    = false
  authorization_scopes                = []
  authorization_type                  = "NONE"
  authorizer_id                       = null
  model_selection_expression          = null
  operation_name                      = null
  region                              = "us-east-2"
  request_models                      = {}
  route_key                           = "OPTIONS /{proxy+}"
  route_response_selection_expression = null
  target                              = "integrations/${aws_apigatewayv2_integration.options-integration.id}"
  depends_on = [ aws_apigatewayv2_integration.options-integration ]
}

# __generated__ by Terraform from aws_apigatewayv2_integration.options-integration.id
resource "aws_apigatewayv2_integration" "options-integration" {
  api_id                        = aws_apigatewayv2_api.chorest-api.id
  connection_id                 = aws_apigatewayv2_vpc_link.chorest-vpc-link.id
  connection_type               = "VPC_LINK"
  content_handling_strategy     = null
  credentials_arn               = null
  description                   = null
  integration_method            = "ANY"
  integration_subtype           = null
  integration_type              = "HTTP_PROXY"
  integration_uri               = aws_lb_listener.http-80-listener.arn
  passthrough_behavior          = null
  payload_format_version        = "1.0"
  region                        = "us-east-2"
  request_parameters            = {}
  request_templates             = {}
  template_selection_expression = null
  timeout_milliseconds          = 30000
}

# __generated__ by Terraform from "vpce-08aa20938b7e70566"
resource "aws_vpc_endpoint" "ecs-agent" {
  auto_accept     = null
  ip_address_type = "ipv4"
  policy = jsonencode({
    Statement = [{
      Action    = "*"
      Effect    = "Allow"
      Principal = "*"
      Resource  = "*"
    }]
  })
  private_dns_enabled        = true
  region                     = "us-east-2"
  resource_configuration_arn = null
  route_table_ids            = []
  security_group_ids         = [aws_default_security_group.default.id]
  service_name               = "com.amazonaws.us-east-2.ecs-agent"
  service_network_arn        = null
  service_region             = "us-east-2"
  subnet_ids                 = [aws_subnet.public-subnet-02.id]
  tags = {
    Name = "ecs-agent"
  }
  tags_all = {
    Name = "ecs-agent"
  }
  vpc_endpoint_type = "Interface"
  vpc_id            = aws_vpc.main.id
  dns_options {
    dns_record_ip_type                             = "ipv4"
    private_dns_only_for_inbound_resolver_endpoint = false
  }
  subnet_configuration {
    ipv4      = "172.31.7.90"
    ipv6      = null
    subnet_id = aws_subnet.public-subnet-02.id
  }
}

# __generated__ by Terraform from "subnet-0d15a7b367d3fcafa/rtb-0125a25e39d55a045"
resource "aws_route_table_association" "private-assoc3" {
  gateway_id     = null
  region         = "us-east-2"
  route_table_id = aws_route_table.private-rt.id
  subnet_id      = aws_subnet.private-subnet-01.id
}

# __generated__ by Terraform from "vpce-06abe48e970017681"
resource "aws_vpc_endpoint" "ecs" {
  auto_accept     = null
  ip_address_type = "ipv4"
  policy = jsonencode({
    Statement = [{
      Action    = "*"
      Effect    = "Allow"
      Principal = "*"
      Resource  = "*"
    }]
  })
  private_dns_enabled        = true
  region                     = "us-east-2"
  resource_configuration_arn = null
  route_table_ids            = []
  security_group_ids         = [aws_security_group.launch-wizard-2.id]
  service_name               = "com.amazonaws.us-east-2.ecs"
  service_network_arn        = null
  service_region             = "us-east-2"
  subnet_ids                 = [aws_subnet.public-subnet-02.id]
  tags = {
    Name = "ecs"
  }
  tags_all = {
    Name = "ecs"
  }
  vpc_endpoint_type = "Interface"
  vpc_id            = aws_vpc.main.id
  dns_options {
    dns_record_ip_type                             = "ipv4"
    private_dns_only_for_inbound_resolver_endpoint = false
  }
  subnet_configuration {
    ipv4      = "172.31.12.248"
    ipv6      = null
    subnet_id = aws_subnet.public-subnet-02.id
  }
}

# __generated__ by Terraform from "vpce-02d376ae452f76d3f"
resource "aws_vpc_endpoint" "s3-gw" {
  auto_accept     = null
  ip_address_type = "ipv4"
  policy = jsonencode({
    Statement = [{
      Action    = "*"
      Effect    = "Allow"
      Principal = "*"
      Resource  = "*"
    }]
    Version = "2008-10-17"
  })
  private_dns_enabled        = false
  region                     = "us-east-2"
  resource_configuration_arn = null
  route_table_ids            = [aws_route_table.private-rt.id]
  security_group_ids         = []
  service_name               = "com.amazonaws.us-east-2.s3"
  service_network_arn        = null
  service_region             = "us-east-2"
  subnet_ids                 = []
  tags = {
    Name = "s3-gw"
  }
  tags_all = {
    Name = "s3-gw"
  }
  vpc_endpoint_type = "Gateway"
  vpc_id            = aws_vpc.main.id
}

# __generated__ by Terraform
resource "aws_instance" "chorest-backend" {
  ami                                  = "ami-05d57b87d2236163e"
  availability_zone                    = "us-east-2a"
  disable_api_stop                     = false
  disable_api_termination              = false
  ebs_optimized                        = false
  force_destroy                        = false
  get_password_data                    = false
  hibernation                          = false
  iam_instance_profile                 = "ECS4EC2"
  instance_initiated_shutdown_behavior = "stop"
  instance_type                        = "t2.micro"
  key_name                             = "chorest"
  monitoring                           = false
  placement_partition_number           = 0
  region                               = "us-east-2"
  secondary_private_ips                = []
  source_dest_check                    = true
  subnet_id                            = aws_subnet.private-subnet-01.id
  tags = {
    Name = "chorest-backend"
  }
  tags_all = {
    Name = "chorest-backend"
  }
  tenancy                     = "default"
  user_data                   = null
  user_data_replace_on_change = null
  volume_tags                 = null
  vpc_security_group_ids      = [aws_security_group.chorest-backend-sg.id]
  capacity_reservation_specification {
    capacity_reservation_preference = "open"
  }
  credit_specification {
    cpu_credits = "standard"
  }
  enclave_options {
    enabled = false
  }
  maintenance_options {
    auto_recovery = "default"
  }
  metadata_options {
    http_endpoint               = "enabled"
    http_protocol_ipv6          = "disabled"
    http_put_response_hop_limit = 1
    http_tokens                 = "optional"
    instance_metadata_tags      = "disabled"
  }
  private_dns_name_options {
    enable_resource_name_dns_a_record    = false
    enable_resource_name_dns_aaaa_record = false
    hostname_type                        = "ip-name"
  }
  root_block_device {
    delete_on_termination = true
    encrypted             = false
    tags                  = {}
    tags_all              = {}
    volume_size           = 30
    volume_type           = "gp2"
  }
}

# __generated__ by Terraform from "vpce-018d4698c7037fe28"
resource "aws_vpc_endpoint" "ecs-api" {
  auto_accept     = null
  ip_address_type = "ipv4"
  policy = jsonencode({
    Statement = [{
      Action    = "*"
      Effect    = "Allow"
      Principal = "*"
      Resource  = "*"
    }]
  })
  private_dns_enabled        = true
  region                     = "us-east-2"
  resource_configuration_arn = null
  route_table_ids            = []
  security_group_ids         = [aws_default_security_group.default.id]
  service_name               = "com.amazonaws.us-east-2.ecr.api"
  service_network_arn        = null
  service_region             = "us-east-2"
  subnet_ids                 = [aws_subnet.public-subnet-02.id]
  tags = {
    Name = "ecr-api"
  }
  tags_all = {
    Name = "ecr-api"
  }
  vpc_endpoint_type = "Interface"
  vpc_id            = aws_vpc.main.id
  dns_options {
    dns_record_ip_type                             = "ipv4"
    private_dns_only_for_inbound_resolver_endpoint = false
  }
  subnet_configuration {
    ipv4      = "172.31.14.39"
    ipv6      = null
    subnet_id = aws_subnet.public-subnet-02.id
  }
}

# __generated__ by Terraform
resource "aws_instance" "chorest-db" {
  ami                                  = "ami-025ca978d4c1d9825"
  availability_zone                    = "us-east-2a"
  disable_api_stop                     = false
  disable_api_termination              = false
  ebs_optimized                        = false
  force_destroy                        = false
  get_password_data                    = false
  hibernation                          = false
  iam_instance_profile                 = "SSM4EC2"
  instance_initiated_shutdown_behavior = "stop"
  instance_type                        = "t2.micro"
  key_name                             = "chorest"
  monitoring                           = false
  placement_partition_number           = 0
  region                               = "us-east-2"
  secondary_private_ips                = []
  source_dest_check                    = true
  subnet_id                            = aws_subnet.private-subnet-01.id
  tags = {
    Name = "chorest-db"
  }
  tags_all = {
    Name = "chorest-db"
  }
  tenancy                     = "default"
  user_data                   = null
  user_data_replace_on_change = null
  volume_tags                 = null
  vpc_security_group_ids      = [aws_security_group.chorest-db-sg.id]
  capacity_reservation_specification {
    capacity_reservation_preference = "open"
  }
  credit_specification {
    cpu_credits = "standard"
  }
  enclave_options {
    enabled = false
  }
  maintenance_options {
    auto_recovery = "default"
  }
  metadata_options {
    http_endpoint               = "enabled"
    http_protocol_ipv6          = "disabled"
    http_put_response_hop_limit = 2
    http_tokens                 = "required"
    instance_metadata_tags      = "disabled"
  }
  private_dns_name_options {
    enable_resource_name_dns_a_record    = false
    enable_resource_name_dns_aaaa_record = false
    hostname_type                        = "ip-name"
  }
  root_block_device {
    delete_on_termination = true
    encrypted             = false
    iops                  = 3000
    tags                  = {}
    tags_all              = {}
    volume_size           = 8
    volume_type           = "gp3"
  }
}
