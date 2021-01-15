DOCKER_TAG=obsidian-query-lines

build:
	docker build --tag $(DOCKER_TAG) .
	docker run \
		-it \
		--volume $$(pwd):/working \
		$(DOCKER_TAG) \
		npm install

run-dev:
	docker run \
		-it \
		--volume $$(pwd):/working \
		$(DOCKER_TAG) \
		npm run dev

shell:
	docker run \
		-it \
		--volume $$(pwd):/working \
		npm-15-devenv \
