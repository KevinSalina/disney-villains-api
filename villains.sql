CREATE USER 'villains'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON villains.* TO 'villains'@'localhost' WITH GRANT OPTION;
