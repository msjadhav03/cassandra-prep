# Cassandra
<p>  
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Cassandra_logo.svg/220px-Cassandra_logo.svg.png" alt="Cassandra Logo" height="260">
</p>

# Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Keyspace](#keyspace)
4. [Keyspace Replication Strategies](#strategy)
5. [Creating Tables](#tables)
6. [Insertion into Table](#insert)
7. [Selection from Table](#select)
8. [Deletion from Table](#delete)
9. [Updation in Table](#update)
10. [Author](#author)

## Introduction

- Highly Scalable
- Distributed NoSQL Database
- Handle large amount of data across multiple nodes and data centers
- Developed by Facebook
- Now maintained as Open source project under Apache Software Foundations
- high Availability
- Fault Tolerance
- Redudancy and Reliability
- Automatic Data distribution and load balancing
- Well suited for application require high scalability, high Availability and the ability to handle large volumes of data with low latency reads and writes.

## Features

1. `Distributed Architecture` - distributes data across nodes
2. `NoSQL Model` - Column-family Data model - allowing each row to have different set of columns
3. `Scalability` - Scale horizontally by adding more nodes to the cluster
4. `High Availability` - replicated data across nodes
5. `Tunable Consistency Level` - Allowing developers to balance between data consistency and availability based on their application's requirement
6. `Query Language` - CQL - resembles SQL
7. `Data Compression` - Supports Data compression to reduce storage requirements and improve performance
8. `Data Distribution` and Replication - data is distributed using partition keys and each parition is replicated across mutiple nodes
9. `Automatic Sharding` - Distributes data across nodes using consistent hashing algorithms
10. `Tunable CAP Theorem` - allows to choose between CAP - Consistency, Availability and Partition based on application level
11. `Multi-Data Center Support` - allowing to replicate data across geographically distributed locatiosn and improved data locality and disaster recovery.
12. `Secondary Indexes` - Supports Seconday indexes to querying on non-primary column

## KeySpace (Database)

###### Creating keyspace

```sql
CREATE KEYSPACE IF NOT EXISTS database_name
WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor':3};
```

Above Command is used to create keySpace
`IF NOT EXISTS` clause ensures if keyspace exists command does not result error

###### WITH replication = {'class':'SimpleStrategy', 'replication_factor':3}

`replication` - defines the replication strategy for the keyspace.
`'class':SimpleStrategy` replication strategy used is "SimpleStrategy" - Suitable for single data center setups

###### Describing Keyspace

```sql
DESC keyspace_name
```

## Keyspace Replication Strategies

|     | Types                                     |
| --- | ----------------------------------------- |
| 1   | SimpleStrategy                            |
| 2   | NetworkTopologyStrategy                   |
| 3   | LocalStrategy                             |
| 4   | OldNetworkTopologyStrategy (`deprecated`) |

1. `Simple Strategy`

- Simplest Replication Strategy
- Suitable for single Data Center Setups
- Places Replicas in ring like fashion, equally distributed across nodes
- `replication_factor` specifies the number of replicas for each piece of data

2. `NetworkTopologyStrategy`

- Used for mutiple Data Center
- allows to define different replication factor for different datacenters

```sql
CREATE KEYSPACE IF NOT EXISTS mykeyspace
WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': 3, 'datacenter2': 2};
```

3. `LocalStrategy`

- Used for mutiple datacenters
- Each data center is responsible for their replication factor
- Used when data centers are independent of each other

```sql
CREATE KEYSPACE IF NOT EXISTS mykeyspacelocal
WITH replication={'class':'LocalStrategy'};
```

## Creating Table

```sql
CREATE TABLE IF NOT EXISTS mykeyspace.blog (
    blog_id UUID PRIMARY KEY,
    title TEXT,
    content TEXT,
    created_at TIMESTAMP
);

```

## Insertion into Table

```sql
INSERT INTO mykeyspace.blog (blog_id, title, content, created_at)
VALUES (uuid(), 'First Blog', 'This is the content.', toTimestamp(now()));

```

## Selection from Table

```sql
SELECT title, content, created_at FROM mykeyspace.blog WHERE blog_id = be63a9f6-7a11-4cf3-b58d-8a5553531cf8;

```

## Deletion from Table

```sql
DELETE FROM mykeyspace.blog WHERE blog_id = be63a9f6-7a11-4cf3-b58d-8a5553531cf8 ;

```

## Updation in Table

```sql
UPDATE mykeyspace.blog SET content = 'Updating Blog Content' WHERE post_id = 49120981-3195-4eb2-9a0d-41ef249f17c3;

```
