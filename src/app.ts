import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import user from "./routes/user";
import company from "./routes/company";
import profile from "./routes/profile";
import survey from "./routes/survey";
import workarea from './routes/workarea';
import allsection from './routes/all-section';
import option from './routes/option';
import optvalue from './routes/option-value';
import question from './routes/question';
import condition from './routes/condition';
import dependency from './routes/dependency';
import survey_answered from './routes/survey-answered';
import permission from "./routes/permission";
import surveyassignment from './routes/survey-assignment';
import surveysection from "./routes/survey-section";
import permisrol from "./routes/permis-rol";
import dynamicform from './routes/dynamic-form';
import surveyversion from './routes/survey-version';
import versec from './routes/ver-section';
import verques from './routes/ver-question';

import { httpLoggerExpress, initContextExpress, getContextValue } from 'pkg-prima-logger';

import cookieParser = require("cookie-parser"); // this module doesn't use the ES6 default export yet
import cors = require("cors");

const app: express.Express = express();

// Apply the request logger middleware
app.use(httpLoggerExpress); // Automatically links req.log
// app.use(initContextExpress); // Start AsyncLocalStorage and set context

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/v1/public", express.static("public"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/user", user);
app.use("/api/v1/company", company);
app.use("/api/v1/profile", profile);
app.use('/api/v1/survey', survey);
app.use('/api/v1/workarea', workarea);
app.use('/api/v1/allsection', allsection);
app.use('/api/v1/optvalue', optvalue);
app.use('/api/v1/question', question);
app.use('/api/v1/condition', condition);
app.use('/api/v1/dependency', dependency);
app.use('/api/v1/surveyanswered', survey_answered);
app.use("/api/v1/permission", permission);
app.use('/api/v1/surveyassignment', surveyassignment);
app.use('/api/v1/surveysection', surveysection);
app.use("/api/v1/permisrol", permisrol);
app.use('/api/v1/dynamicform', dynamicform);
app.use('/api/v1/surveyversion', surveyversion);
app.use('/api/v1/option', option);
app.use('/api/v1/versec', versec);
app.use('/api/v1/verques', verques);

app.get(/.*/, function (req, res, next) {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/public/index.html");
});

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  const logContext = getContextValue("logContext", {});

  req.log.error(
    { err, res, ...logContext },
    'Unhandled error occurred'
  ); // Error middleware

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((error: any, req, res, next) => {
    res.status(error["status"] || 500);
    res.render("error", {
      message: error.message,
      error,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((error: any, req, res, next) => {
  res.status(error["status"] || 500);
  res.render("error", {
    message: error.message,
    error: {},
  });
  return null;
});

export default app;
