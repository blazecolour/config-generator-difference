install: 
		npm install

start: 
		npm run babel-node -- src/bin/gendiff.js --format plain before_tree.json after_tree.json

test:
		npm test

lint: 
		npm run eslint .

publish: 
		npm publish
