# # VPC and subnets

# import {
#     to = aws_vpc.main
#     id = "vpc-09b28eb5f4a42bdac"
# }

# import {
#   to = aws_subnet.private-subnet-01
#   id = "subnet-0d15a7b367d3fcafa"
# }

# import {
#   to = aws_subnet.private-subnet-02
#   id = "subnet-0e9f41a4fb43651dc"
# }

# import {
#   to = aws_subnet.private-subnet-03
#   id = "subnet-03c07377329914896"
# }

# import {
#   to = aws_subnet.public-subnet-01
#   id = "subnet-0dd61a77843b58fba"
# }

# import {
#   to = aws_subnet.public-subnet-02
#   id = "subnet-05da0904e5df53b54"
# }

# import {
#   to = aws_subnet.public-subnet-03
#   id = "subnet-0075295de132ab146"
# }

# # RTB and assocs

# import {
#   to = aws_route_table.public-rt
#   id = "rtb-00c65ee26eecde9bb"
# }

# import {
#   to = aws_route_table_association.public-assoc1
#   id = "subnet-05da0904e5df53b54/rtb-00c65ee26eecde9bb"
# }

# import {
#   to = aws_route_table_association.public-assoc2
#   id = "subnet-0075295de132ab146/rtb-00c65ee26eecde9bb"
# }

# import {
#   to = aws_route_table_association.public-assoc3
#   id = "subnet-0dd61a77843b58fba/rtb-00c65ee26eecde9bb"
# }

# import {
#   to = aws_route_table.private-rt
#   id = "rtb-0125a25e39d55a045"
# }

# import {
#   to = aws_route_table_association.private-assoc1
#   id = "subnet-03c07377329914896/rtb-0125a25e39d55a045"
# }

# import {
#   to = aws_route_table_association.private-assoc2
#   id = "subnet-0e9f41a4fb43651dc/rtb-0125a25e39d55a045"
# }

# import {
#   to = aws_route_table_association.private-assoc3
#   id = "subnet-0d15a7b367d3fcafa/rtb-0125a25e39d55a045"
# }

# # IGW

# import {
#   to = aws_internet_gateway.igw
#   id = "igw-0267ec03c7ac3f564"
# }

# import {
#   to = aws_internet_gateway_attachment.igw-assoc
#   id = "igw-0267ec03c7ac3f564:vpc-09b28eb5f4a42bdac"
# }

# #SG

# import {
#   to = aws_security_group.launch-wizard-2
#   id = "sg-0487f45fe81b120e9"
# }

# import {
#   to = aws_security_group.ecs-endpoints-sg
#   id = "sg-0b7f5bd4c160ef163"
# }

# import {
#   to = aws_security_group.chorest-alb-sg
#   id = "sg-0775767a26032eff6"
# }

# import {
#   to = aws_security_group.chorest-db-sg
#   id = "sg-004f41770d106e094"
# }

# import {
#   to = aws_security_group.ec2-instance-connect-sg
#   id = "sg-090d0986995155a95"
# }

# import {
#   to = aws_security_group.default
#   id = "sg-0f9cecec0778edcd5"
# }

# import {
#   to = aws_security_group.chorest-backend-sg
#   id = "sg-0d2e3327e8b3d9d46"
# }

# # Endpoints

# import {
#   to = aws_vpc_endpoint.ecs
#   id = "vpce-06abe48e970017681"
# }

# import {
#   to = aws_vpc_endpoint.ecs-agent
#   id = "vpce-08aa20938b7e70566"
# }

# import {
#   to = aws_vpc_endpoint.ecs-telemetry
#   id = "vpce-05d0444697e7137c0"
# }

# import {
#   to = aws_vpc_endpoint.ecs-dkr
#   id = "vpce-04c935f0650aa1c52"
# }

# import {
#   to = aws_vpc_endpoint.ecs-api
#   id = "vpce-018d4698c7037fe28"
# }

# import {
#   to = aws_vpc_endpoint.s3-gw
#   id = "vpce-02d376ae452f76d3f"
# }

# import {
#   to = aws_ec2_instance_connect_endpoint.ec2-instance-connect
#   id = "eice-0428ac356ad972eab"
# }

# # ALB

# import {
#   to = aws_lb.chorest-alb 
#   identity = {
#     "arn" = "arn:aws:elasticloadbalancing:us-east-2:004058506860:loadbalancer/app/chorest-alb/b06c01abf3a8683c"
#   }
# }

# import {
#   to = aws_lb_listener.http-80-listener
#   identity = {
#     "arn" = "arn:aws:elasticloadbalancing:us-east-2:004058506860:listener/app/chorest-alb/b06c01abf3a8683c/6bbdc7b0ee56f089"
#   }
# }

# import {
#   to = aws_lb_target_group.chorest-backend-tg
#   identity = {
#     "arn" = "arn:aws:elasticloadbalancing:us-east-2:004058506860:targetgroup/chorest-backend-tg/b10b93b5f6eb7a6f"
#   }
# }

# import {
#   to = aws_lb_target_group.chorest-frontend-tg
#   identity = {
#     "arn" = "arn:aws:elasticloadbalancing:us-east-2:004058506860:targetgroup/chorest-frontend-tg/4259b30bd211454e"
#   }
# }

# # EC2

# import {
#   to = aws_instance.chorest-db
#   identity = {
#     id = "i-078e30b77e1380bd2"
#   }
# }

# import {
#   to = aws_instance.chorest-backend
#   identity = {
#     id = "i-0d84cc47df08df10e"
#   }
# }

# # API GW

# import {
#   to = aws_apigatewayv2_api.chorest-api
#   id = "7ctmxbzdl4"
# }

# import {
#   to = aws_apigatewayv2_stage.default
#   id = "7ctmxbzdl4/$default"
# }

# import {
#   to = aws_apigatewayv2_route.options 
#   id = "7ctmxbzdl4/aswexfs"
# }

# import {
#   to = aws_apigatewayv2_route.any 
#   id = "7ctmxbzdl4/tcry986"
# }

# import {
#   to = aws_apigatewayv2_integration.options-integration
#   id = "7ctmxbzdl4/ar7rdym"
# }

# import {
#   to = aws_apigatewayv2_domain_name.chorest-api-domain-name
#   id = "api.chorest.shop"
# }

# import {
#   to = aws_apigatewayv2_vpc_link.chorest-vpc-link
#   id = "2th25v"
# }

# # Cloudfront

# import {
#   to = aws_cloudfront_distribution.chorest-cf
#   id = "E9UBXIEVOWFLK"
# }

# import {
#   to = aws_cloudfront_origin_access_control.chorest-cf-oac
#   id = "E1G1JAOLQAD8D2"
# }