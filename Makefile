install: 
		npm install

start: 
		npm run babel-node -- src/bin/gendiff.js before.yml after.yml

test:
		npm test

lint: 
		npm run eslint .

publish: 
		npm publish
