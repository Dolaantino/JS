
SRC_DIR = src

all: install start

install:
	cd $(SRC_DIR) && npm install --force

start:
	cd $(SRC_DIR) && npm start

build:
	cd $(SRC_DIR) && npm run build

clean:
	rm -rf $(SRC_DIR)/build $(SRC_DIR)/node_modules

.PHONY: all install start build clean

