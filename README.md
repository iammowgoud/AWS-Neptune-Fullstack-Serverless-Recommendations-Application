# Fullstack Serverless Recommendations Application powered by AWS Neptune

[Demo]

## Requirments

- AWS Account (Billing Enabled)
- [Serverless Stack](http://serverless-stack.com) npm package 

## Architecture

- Amazon CloudFormation
- Amazon APIGateway
- Amazon Neptune
- Amazon EC2
- Amazon S3
- Amazon DynamoDB (Optional) 

[Pics]

## Deployment 

#### Repo structure

#### Steps

- [Setup AWS CLI]()
- [Building React App]()
- [Deploy to AWS using `serverless`]()
  - Explain the different YAML files
- [Double check SecurityGroup & VPC]()
  
#### Other steps

- [Partial deploy: UI only]()
- [Partial deploy: Lambda Only]()
- [Setup Lambda Functions]()

#### How to

- [Writing a Lambda function to pull from Neptune]()

## Missing Feature

- Bulk Load from CSV


#### Issues/Improvements

- Remove "Setup React app AWS config" step by setting environment variables
- Pull Gremlin endpoint/port from environment variables in Lambda functions
- Assign Lambda Functions to VPC in deployment stage using CloudFormation YAML
