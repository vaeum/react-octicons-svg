build:
	rm -rf dist
	rm -rf index.js
	touch index.js
	./node_modules/.bin/gulp

prepublish:
	rm -rf ./dist
	rm -rf ./index.js
	touch index.js
	./node_modules/.bin/gulp
	babel index.js --out-dir .
	babel dist --out-dir ./dist
	rm -rf dist/*.jsx
