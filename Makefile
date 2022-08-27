SOLIDITY_DIR=solidity/

include .env
export $(shell sed 's/=.*//' .env)

PROJECT_DIR := $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
export PROJECT_DIR
compile:
	solc --abi --bin --overwrite -o $(SOLIDITY_DIR)artifacts  $(SOLIDITY_DIR)contracts/$(CONTRACT).sol
deploy: compile
	node $(SOLIDITY_DIR)scripts/deploy.js
run:
	node index.js
info:
	node $(SOLIDITY_DIR)scripts/info.js
state:
	node $(SOLIDITY_DIR)tests/state.js
unpause:
	node $(SOLIDITY_DIR)tests/unpause.js
create:
	node $(SOLIDITY_DIR)tests/create.js $m
give:
	node $(SOLIDITY_DIR)tests/give.js
back:
	node $(SOLIDITY_DIR)tests/back.js
onSale:
	node $(SOLIDITY_DIR)tests/onSale.js
trans:
	node $(SOLIDITY_DIR)tests/trans.js
buy:
	node $(SOLIDITY_DIR)tests/buy.js

