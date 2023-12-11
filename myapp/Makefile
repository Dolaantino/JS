SRC_DIR = src

all: install start

install:
	cd $(SRC_DIR) && npm install --force

start:
	cd $(SRC_DIR) && npm start

clean:
	rm -rf package-lock.json node_modules

.PHONY: all install start clean

.error:
	cd $(SRC_DIR) && npm audit fix --force && npm start || true
