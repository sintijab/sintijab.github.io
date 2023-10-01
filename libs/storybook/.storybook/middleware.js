const fs = require('fs');
const fsExtra = require('fs-extra');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const expressMiddleWare = router => {
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());
  router.post('/api/lookup', (req, res) => {
    const filepath = req.body.path; // njsscan-ignore: join_resolve_path_traversal
    // semgrep: validate file path in file system, tildes are not interpreted unless started with on path
    const parentDir = filepath.match(/[.]{2}/g);
    // nodejs: ensure that user input does not reach `join()` or `resolve() that can result in path traversal
    const isAbsolutePath = path.isAbsolute(filepath);
    if (!parentDir && !isAbsolutePath) {
    // nosemgrep: eslint.detect-non-literal-fs-filename
    const absolutePath = path.join(__dirname, '../src/' + filepath);
    // nosemgrep: eslint.detect-non-literal-fs-filename
      if (fs.existsSync(absolutePath)) {
        res.statusCode = 409;
        res.send('Markdown already exist');
      } else {
        // nosemgrep: eslint.detect-non-literal-fs-filename
        fsExtra.ensureFile(absolutePath, (err) => {
          if (err) {
            console.log(err);
            res.send('Error while writing markdown files');
          }
          res.send('OK');
      });
      }
    } else {
      res.statusCode = 404;
      res.send('File not found. Check if the story is in src folder and reload the page.');
    }
  });
  router.post('/api/docs', (req, res) => {
    const filepath = req.body.path; // njsscan-ignore: join_resolve_path_traversal
    // semgrep: validate file path in file system, tildes are not interpreted unless started with on path
    const parentDir = filepath.match(/[.]{2}/g);
    // nodejs: ensure that user input does not reach `join()` or `resolve() that can result in path traversal
    const isAbsolutePath = path.isAbsolute(filepath);
    if (!parentDir && !isAbsolutePath) {
      const docs = req.body.data;
      // nosemgrep: eslint.detect-non-literal-fs-filename
      fs.writeFile(path.join(__dirname, '../src/' + filepath), docs, (err) => {
        if (err) {
          console.log(err);
        }
        res.send('OK');
    });
    } else {
      res.statusCode = 404;
      res.send('File not found. If you have renamed the files or stories try reloading browser, and for the old content check the markdown folder.');
    }
  });
};

module.exports = expressMiddleWare;