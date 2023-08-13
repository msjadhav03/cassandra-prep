# Cassandra

#### Introduction

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

### Features

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


#### KeySpace (Database)
Creating keyspace
```sql
CREATE KEYSPACE IF NOT EXISTS database_name 
WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor':3};
``` 
Above Command is used to create keySpace
`IF NOT EXISTS` clause ensures if keyspace exists command does not result error
###### WITH replication = {'class':'SimpleStrategy', 'replication_factor':3} 
`replication` - defines the replication strategy for the keyspace.
`'class':SimpleStrategy` replication strategy used is "SimpleStrategy" - Suitable for single data center setups

#### Keyspace Replication Strategies
1. `Simple Strategy` 
Simplest Replication Strategy
Suitable for single Data Center Setups
Places Replicas in ring like fashion, equally distributed across nodes
`replication_factor` specifies the number of replicas for each piece of data
