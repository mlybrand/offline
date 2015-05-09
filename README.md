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

## Description and Specifications for Example App

## Phases
