SOLIDITY_DIR=solidity/

include .env
export $(shell sed 's/=.*//' .env)

PROJECT_DIR := $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
export PROJECT_DIR
compile:
	solc --abi --bin --overwrite -o $(SOLIDITY_DIR)artifacts  $(SOLIDITY_DIR)contracts/$(CONTRACT).sol
deploy: compile
	node $(SOLIDITY_DIR)scripts/deploy.js
info:
	node $(SOLIDITY_DIR)scripts/info.js
d:
	node $(SOLIDITY_DIR)scripts/d.js