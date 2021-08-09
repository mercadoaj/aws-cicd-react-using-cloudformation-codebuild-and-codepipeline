# This is a simple react CRUD page that uses aws cloudformation.

This is a simple react CRUD that uses a cloudformation template to create resource for CI/CD. The page is deployed to an S3 bucket. You *need* an aws account to run this project.

For more info, please look at the `cf.yml` file.



## Installation
1. Create a new repository on AWS CodeCommit with these files.
2. In the cf.yml, replace the parameters for `RootDomainName`, `AcctId`, `Region`, `CodeCommitRepoName` and `RepoURL`.
```
Parameters:
  RootDomainName:
    Description: Domain name for your website 
    Type: String
    Default: aws-demo-aj
  RepositoryBranch:
    Type: String
    Default: master
  AcctId:
    Type: String
    Default: '111111111111'
  Region:
    Type: String
    Default: ap-southeast-1
  CodeCommitRepoName:
    Type: String
    Default: aws-cf
  RepoURL:
    Type: String
    Default: https://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/aws-cf
```
3. In the buildspec.yml, add the name of your s3 bucket. It *must* be the same with your `RootDomainName`.
```
  post_build:
    commands:
       - aws s3 sync build/ s3://<RootDomainName> --acl public-read
```

The template will create the following resources:
1. S3 Bucket
2. CodeBuild Project
3. Code Pipeline

Along with these resources, policies and roles will also be created. 

## Usage

For the CI/CD to work, we need to create a cloudformation stack first. 

### `aws cloudformation create-stack --stack-name  demo --template-body file://cf.yml --capabilities CAPABILITY_NAMED_IAM`

Replace `demo` with whatever stackname you want to use.

To remove,
### `aws cloudformation delete-stack --stackname demo`

After this, All pushed changes will trigger the CI/CD and automatically deploy changes to S3. Please also note that the s3 is public. 

