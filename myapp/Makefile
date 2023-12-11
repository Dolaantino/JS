SRC_DIR = src

all: install start

install:
	cd $(SRC_DIR) && npm install --force

start:
	cd $(SRC_DIR) && npm start

clean:
	rm -rf package-lock.json node_modules

restart: clean install start

.PHONY: all install start clean restart

.error:
	cd $(SRC_DIR) && npm audit fix --force && npm start || true
