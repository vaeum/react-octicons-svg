build:
	rm -rf dist
	rm -rf index.js
	touch index.js
	./node_modules/.bin/gulp
