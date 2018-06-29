install: 
		npm install

start: 
		npm run babel-node -- src/bin/gendiff.js before.ini after.ini

test:
		npm test

lint: 
		npm run eslint .

publish: 
		npm publish
