db:
	docker run \
	-d \
	-p 27017:27017 \
	--rm \
	--name liveedit-db \
	mongo:3.6.1
