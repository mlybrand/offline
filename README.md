# Offline HTML Application

## Introduction

There is often the need to have a web application that can continue to function even when a network connection is not
available. Some use cases for this need:

* Access from mobile devices with spotty or non-existent network availability
* Work from a laptop in situations without network access
* Need to continue business functions even when the network experiences outages

Given this need, it would be desirable to gain some knowledge and experience in approaches to using current HTML
capabilities to provide such an application.

## Challenges to Address

Here are some of the specific challenges to be addressed:

* There must be some way to check for network availability
* All necessary files for functioning must be available locally when there is no network
* All necessary data for a given task must be available locally when there is no network
* Server-side data should used when there is a network connection.
* When reconnecting to the network, data needs to be synced
* Data conflicts need to be resolved when other users or processes have changed data during a session's network
outage
* The system needs to have a way to inform connected users of potential data conflicts when formerly disconnected
users return
* There needs to be some process for acquiring data prior to an outage, whether the outage is planned or not.

## Issues Outside of Scope

There are other issues that are equally important, but that will not be part of this presentation. If there is 
interest, then these issues can be addressed in a separate presentation.

* Security and access control
* Encryption/safeguarding locally stored data

## Tech Used and Assumptions Made

The technology I am choosing is not necessarily the best approach.  Partially, I am picking the tech based on my
comfort level, as well as an attempt to focus my attention on what I believe to be relevant.  I want to focus 
on using HTML5 features to develop an application that will continue to work offline.  I don't want to get 
caught up with learning particular frameworks which could make some of this easier, more reusable and/or more 
organized/efficient.  As such here is the stack I am going to use:

* Node.js (I am comfortable with it and I don't need any overhead to get a server side app up and running)
* Express.js (Provides a bare-bones and un-opionated MVC framework)
* Handlebars.js (pretty ubiquitous template language for views)
* MongoDB / Mongoose (seamless database to JSON connection)
* Knockout (for some minimal data-binding)
* Bootstrap (a web dev's best friend for quickly prototyping)
* Mocha/Chai (gotta have some tests)
* Grunt (build runner to formalize repetitive tasks)
* JSHint (keep my JavaScript honest)

## Description and Specifications for Example App

The sample application that I will be building will be an equipment inventory system.

## Phases

