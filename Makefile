run:
	rm -rf dist
	rm -rf index.js
	touch index.js
	./node_modules/.bin/gulp

build:
	rm -rf dist
	rm -rf index.js
	touch index.js
	./node_modules/.bin/gulp build

prepublish:
	rm -rf ./dist
	rm -rf ./index.js
	touch index.js
	./node_modules/.bin/gulp build
	./node_modules/.bin/babel -q index.js --out-dir .
	./node_modules/.bin/babel -q dist --out-dir ./dist
	# rm -rf dist/*.jsx
