PHONY: github pudding

github:
	rm -rf docs
	cp -r build docs
	touch docs/.nojekyll
	git add -A
	git commit -m "update github pages"
	git push
	
aws-sync:
	aws s3 sync build s3://pudding.cool/2024/10/abortion-mazes --delete --cache-control 'max-age=31536000'

aws-cache:
	aws cloudfront create-invalidation --distribution-id E13X38CRR4E04D --paths '/2024/10/abortion-mazes*'	

pudding: aws-sync aws-cache