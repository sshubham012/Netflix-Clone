require('dotenv').config()
const cors = require('cors');

const express = require("express");
const app = express();

const db_connect = require('./database/connect_database');
const authenticateUser = require("./middleware/user_auth_middleware");

