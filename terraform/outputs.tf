output "website_bucket_name" {
  value = aws_s3_bucket.frontend_bucket.bucket
}

output "website_url" {
  description = "URL de CloudFront (Usa esta para el parcial)"
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}