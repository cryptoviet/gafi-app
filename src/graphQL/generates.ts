import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /** The day, does not include a time. */
  Date: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type BigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigFloat']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigFloat']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigFloat']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigFloat']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigFloat']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigFloat']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigFloat']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigFloat']>>;
};

/** A connection to a list of `BlockEntity` values. */
export type BlockEntitiesConnection = {
  __typename?: 'BlockEntitiesConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<BlockEntityAggregates>;
  /** A list of edges which contains the `BlockEntity` and cursor to aid in pagination. */
  edges: Array<BlockEntitiesEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<BlockEntityAggregates>>;
  /** A list of `BlockEntity` objects. */
  nodes: Array<Maybe<BlockEntity>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BlockEntity` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `BlockEntity` values. */
export type BlockEntitiesConnectionGroupedAggregatesArgs = {
  groupBy: Array<BlockEntitiesGroupBy>;
  having?: InputMaybe<BlockEntitiesHavingInput>;
};

/** A `BlockEntity` edge in the connection. */
export type BlockEntitiesEdge = {
  __typename?: 'BlockEntitiesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `BlockEntity` at the end of the edge. */
  node?: Maybe<BlockEntity>;
};

/** Grouping methods for `BlockEntity` for usage during aggregation. */
export enum BlockEntitiesGroupBy {
  Field1 = 'FIELD1',
  Field4 = 'FIELD4',
  Field5 = 'FIELD5',
  Field6 = 'FIELD6'
}

/** Conditions for `BlockEntity` aggregates. */
export type BlockEntitiesHavingInput = {
  AND?: InputMaybe<Array<BlockEntitiesHavingInput>>;
  OR?: InputMaybe<Array<BlockEntitiesHavingInput>>;
};

/** Methods to use when ordering `BlockEntity`. */
export enum BlockEntitiesOrderBy {
  Field1Asc = 'FIELD1_ASC',
  Field1Desc = 'FIELD1_DESC',
  Field4Asc = 'FIELD4_ASC',
  Field4Desc = 'FIELD4_DESC',
  Field5Asc = 'FIELD5_ASC',
  Field5Desc = 'FIELD5_DESC',
  Field6Asc = 'FIELD6_ASC',
  Field6Desc = 'FIELD6_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type BlockEntity = Node & {
  __typename?: 'BlockEntity';
  field1?: Maybe<Scalars['Int']>;
  field4?: Maybe<Scalars['Datetime']>;
  field5?: Maybe<Scalars['Boolean']>;
  field6?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

export type BlockEntityAggregates = {
  __typename?: 'BlockEntityAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
};

/** A filter to be used against `BlockEntity` object types. All fields are combined with a logical ‘and.’ */
export type BlockEntityFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BlockEntityFilter>>;
  /** Filter by the object’s `field1` field. */
  field1?: InputMaybe<IntFilter>;
  /** Filter by the object’s `field4` field. */
  field4?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `field5` field. */
  field5?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `field6` field. */
  field6?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BlockEntityFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BlockEntityFilter>>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']>>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type JsonFilter = {
  /** Contained by the specified JSON. */
  containedBy?: InputMaybe<Scalars['JSON']>;
  /** Contains the specified JSON. */
  contains?: InputMaybe<Scalars['JSON']>;
  /** Contains all of the specified keys. */
  containsAllKeys?: InputMaybe<Array<Scalars['String']>>;
  /** Contains any of the specified keys. */
  containsAnyKeys?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified key. */
  containsKey?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['JSON']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['JSON']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['JSON']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['JSON']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['JSON']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['JSON']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['JSON']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['JSON']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['JSON']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['JSON']>>;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  _metadata?: Maybe<_Metadata>;
  /** Reads and enables pagination through a set of `BlockEntity`. */
  blockEntities?: Maybe<BlockEntitiesConnection>;
  blockEntity?: Maybe<BlockEntity>;
  /** Reads a single `BlockEntity` using its globally unique `ID`. */
  blockEntityByNodeId?: Maybe<BlockEntity>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  sponsoredPool?: Maybe<SponsoredPool>;
  /** Reads a single `SponsoredPool` using its globally unique `ID`. */
  sponsoredPoolByNodeId?: Maybe<SponsoredPool>;
  /** Reads and enables pagination through a set of `SponsoredPool`. */
  sponsoredPools?: Maybe<SponsoredPoolsConnection>;
  transfer?: Maybe<Transfer>;
  /** Reads a single `Transfer` using its globally unique `ID`. */
  transferByNodeId?: Maybe<Transfer>;
  /** Reads and enables pagination through a set of `Transfer`. */
  transfers?: Maybe<TransfersConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBlockEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<BlockEntityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BlockEntitiesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBlockEntityArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBlockEntityByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySponsoredPoolArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySponsoredPoolByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySponsoredPoolsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<SponsoredPoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SponsoredPoolsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTransferArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTransferByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<TransferFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TransfersOrderBy>>;
};

export type SponsoredPool = Node & {
  __typename?: 'SponsoredPool';
  amount: Scalars['BigFloat'];
  createdAt?: Maybe<Scalars['Datetime']>;
  discount: Scalars['Int'];
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  poolId: Scalars['String'];
  poolOwner: Scalars['String'];
  targets: Scalars['JSON'];
  txLimit: Scalars['Int'];
};

export type SponsoredPoolAggregates = {
  __typename?: 'SponsoredPoolAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
};

/** A filter to be used against `SponsoredPool` object types. All fields are combined with a logical ‘and.’ */
export type SponsoredPoolFilter = {
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<BigFloatFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SponsoredPoolFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `discount` field. */
  discount?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SponsoredPoolFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SponsoredPoolFilter>>;
  /** Filter by the object’s `poolId` field. */
  poolId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `poolOwner` field. */
  poolOwner?: InputMaybe<StringFilter>;
  /** Filter by the object’s `targets` field. */
  targets?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `txLimit` field. */
  txLimit?: InputMaybe<IntFilter>;
};

/** A connection to a list of `SponsoredPool` values. */
export type SponsoredPoolsConnection = {
  __typename?: 'SponsoredPoolsConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<SponsoredPoolAggregates>;
  /** A list of edges which contains the `SponsoredPool` and cursor to aid in pagination. */
  edges: Array<SponsoredPoolsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<SponsoredPoolAggregates>>;
  /** A list of `SponsoredPool` objects. */
  nodes: Array<Maybe<SponsoredPool>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SponsoredPool` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `SponsoredPool` values. */
export type SponsoredPoolsConnectionGroupedAggregatesArgs = {
  groupBy: Array<SponsoredPoolsGroupBy>;
  having?: InputMaybe<SponsoredPoolsHavingInput>;
};

/** A `SponsoredPool` edge in the connection. */
export type SponsoredPoolsEdge = {
  __typename?: 'SponsoredPoolsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SponsoredPool` at the end of the edge. */
  node?: Maybe<SponsoredPool>;
};

/** Grouping methods for `SponsoredPool` for usage during aggregation. */
export enum SponsoredPoolsGroupBy {
  Amount = 'AMOUNT',
  CreatedAt = 'CREATED_AT',
  Discount = 'DISCOUNT',
  PoolId = 'POOL_ID',
  PoolOwner = 'POOL_OWNER',
  Targets = 'TARGETS',
  TxLimit = 'TX_LIMIT'
}

/** Conditions for `SponsoredPool` aggregates. */
export type SponsoredPoolsHavingInput = {
  AND?: InputMaybe<Array<SponsoredPoolsHavingInput>>;
  OR?: InputMaybe<Array<SponsoredPoolsHavingInput>>;
};

/** Methods to use when ordering `SponsoredPool`. */
export enum SponsoredPoolsOrderBy {
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DiscountAsc = 'DISCOUNT_ASC',
  DiscountDesc = 'DISCOUNT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PoolIdAsc = 'POOL_ID_ASC',
  PoolIdDesc = 'POOL_ID_DESC',
  PoolOwnerAsc = 'POOL_OWNER_ASC',
  PoolOwnerDesc = 'POOL_OWNER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TargetsAsc = 'TARGETS_ASC',
  TargetsDesc = 'TARGETS_DESC',
  TxLimitAsc = 'TX_LIMIT_ASC',
  TxLimitDesc = 'TX_LIMIT_DESC'
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']>;
};

export type TableEstimate = {
  __typename?: 'TableEstimate';
  estimate?: Maybe<Scalars['Int']>;
  table?: Maybe<Scalars['String']>;
};

export type Transfer = Node & {
  __typename?: 'Transfer';
  amount: Scalars['BigFloat'];
  blockNumber: Scalars['BigFloat'];
  from: Scalars['String'];
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  to: Scalars['String'];
};

export type TransferAggregates = {
  __typename?: 'TransferAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
};

/** A filter to be used against `Transfer` object types. All fields are combined with a logical ‘and.’ */
export type TransferFilter = {
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<BigFloatFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TransferFilter>>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `from` field. */
  from?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TransferFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TransferFilter>>;
  /** Filter by the object’s `to` field. */
  to?: InputMaybe<StringFilter>;
};

/** A connection to a list of `Transfer` values. */
export type TransfersConnection = {
  __typename?: 'TransfersConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<TransferAggregates>;
  /** A list of edges which contains the `Transfer` and cursor to aid in pagination. */
  edges: Array<TransfersEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<TransferAggregates>>;
  /** A list of `Transfer` objects. */
  nodes: Array<Maybe<Transfer>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Transfer` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `Transfer` values. */
export type TransfersConnectionGroupedAggregatesArgs = {
  groupBy: Array<TransfersGroupBy>;
  having?: InputMaybe<TransfersHavingInput>;
};

/** A `Transfer` edge in the connection. */
export type TransfersEdge = {
  __typename?: 'TransfersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Transfer` at the end of the edge. */
  node?: Maybe<Transfer>;
};

/** Grouping methods for `Transfer` for usage during aggregation. */
export enum TransfersGroupBy {
  Amount = 'AMOUNT',
  BlockNumber = 'BLOCK_NUMBER',
  From = 'FROM',
  To = 'TO'
}

/** Conditions for `Transfer` aggregates. */
export type TransfersHavingInput = {
  AND?: InputMaybe<Array<TransfersHavingInput>>;
  OR?: InputMaybe<Array<TransfersHavingInput>>;
};

/** Methods to use when ordering `Transfer`. */
export enum TransfersOrderBy {
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  BlockNumberAsc = 'BLOCK_NUMBER_ASC',
  BlockNumberDesc = 'BLOCK_NUMBER_DESC',
  FromAsc = 'FROM_ASC',
  FromDesc = 'FROM_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ToAsc = 'TO_ASC',
  ToDesc = 'TO_DESC'
}

export type _Metadata = {
  __typename?: '_Metadata';
  chain?: Maybe<Scalars['String']>;
  dynamicDatasources?: Maybe<Scalars['String']>;
  genesisHash?: Maybe<Scalars['String']>;
  indexerHealthy?: Maybe<Scalars['Boolean']>;
  indexerNodeVersion?: Maybe<Scalars['String']>;
  lastProcessedHeight?: Maybe<Scalars['Int']>;
  lastProcessedTimestamp?: Maybe<Scalars['Date']>;
  queryNodeVersion?: Maybe<Scalars['String']>;
  rowCountEstimate?: Maybe<Array<Maybe<TableEstimate>>>;
  specName?: Maybe<Scalars['String']>;
  targetHeight?: Maybe<Scalars['Int']>;
};

export type SponsoredPoolsQueryVariables = Exact<{
  first: Scalars['Int'];
  offset: Scalars['Int'];
  filter?: InputMaybe<SponsoredPoolFilter>;
}>;


export type SponsoredPoolsQuery = { __typename?: 'Query', sponsoredPools?: { __typename?: 'SponsoredPoolsConnection', totalCount: number, nodes: Array<{ __typename?: 'SponsoredPool', id: string, amount: any, poolOwner: string, targets: any, discount: number, txLimit: number, createdAt?: any | null } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type TransfersQueryVariables = Exact<{ [key: string]: never; }>;


export type TransfersQuery = { __typename?: 'Query', transfers?: { __typename?: 'TransfersConnection', totalCount: number, nodes: Array<{ __typename?: 'Transfer', id: string, amount: any, from: string } | null> } | null };


export const SponsoredPoolsDocument = `
    query SponsoredPools($first: Int!, $offset: Int!, $filter: SponsoredPoolFilter) {
  sponsoredPools(first: $first, offset: $offset, filter: $filter) {
    nodes {
      id
      amount
      poolOwner
      targets
      discount
      txLimit
      createdAt
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;
export const useSponsoredPoolsQuery = <
      TData = SponsoredPoolsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SponsoredPoolsQueryVariables,
      options?: UseQueryOptions<SponsoredPoolsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SponsoredPoolsQuery, TError, TData>(
      ['SponsoredPools', variables],
      fetcher<SponsoredPoolsQuery, SponsoredPoolsQueryVariables>(client, SponsoredPoolsDocument, variables, headers),
      options
    );
export const TransfersDocument = `
    query Transfers {
  transfers(first: 5) {
    nodes {
      id
      amount
      from
    }
    totalCount
  }
}
    `;
export const useTransfersQuery = <
      TData = TransfersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: TransfersQueryVariables,
      options?: UseQueryOptions<TransfersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<TransfersQuery, TError, TData>(
      variables === undefined ? ['Transfers'] : ['Transfers', variables],
      fetcher<TransfersQuery, TransfersQueryVariables>(client, TransfersDocument, variables, headers),
      options
    );