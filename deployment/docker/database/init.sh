#!/bin/bash

/usr/bin/mysqld_safe --skip-grant-tables &
sleep 5
echo "111111"
mysql -u root -p123 -e "USE pong;"
echo "222222"
mysql -u root -p123 pong < /tmp/init.sql
