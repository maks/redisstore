export('connect');

var DefaultCodec = Packages.org.jredis.ri.alphazero.support.DefaultCodec;

function RedisConnection() {
	this.redis = new Packages.org.jredis.ri.alphazero.JRedisClient();
}	


RedisConnection.prototype._checkConnection = function() {
	if (!this.redis) {
		throw Error("connection to redis is closed");
	}
}

/**
 * Test if specified key exists
 * @param {String} key
 * @returns true if existws, false otherwise
 */
RedisConnection.prototype.exits = function(key) {
	return this.redis.exists();
}

/**
 * 
 * @param {String} key
 * @returns {String}
 */
RedisConnection.prototype.type = function(key) {
	return this.redis.type(key);
}

RedisConnection.prototype.del = function(key) {
	return this.redis.del(key);
}


/**
 * 
 * @param pattern
 * @returns
 */
RedisConnection.prototype.keys = function(pattern) {
	return pattern ? this.redis.keys(pattern) : this.redis.keys();
}


/**
 * @param {String} key
 * @returns {String} value
 */
RedisConnection.prototype.get = function(key) {
	this._checkConnection();
	var result = this.redis.get(key);
	return (result != null) ? DefaultCodec.toStr(result) : result;
}
	
/**
 * 
 * @param {String} key
 * @param {String} value
 * @returns
 */
RedisConnection.prototype.set = function(key, value) {
	return this.redis.set(key, value);
}

/**
 * 
 * @param key
 * @param value
 * @returns
 */
RedisConnection.prototype.sadd = function(key, value) {
	return this.redis.sadd(key, value);
}



/**
 * 
 * @param key
 * @returns
 */
RedisConnection.prototype.smembers = function(key) {
	var l = this.redis.smembers(key);
	var result;
	if (l) {
		result = [];
		for (var iterator = l.iterator(); iterator.hasNext();) {
			result.push(DefaultCodec.toStr(iterator.next()));				
		}
	}
	return result;
}

/** 
 * Close any currently open connection to the redis server
 * Does nothing if te connection is already closed 
 * @param key
 * @param value
 * @returns
 */
RedisConnection.prototype.close = function(key, value) {
	if (this.redis) {
		this.redis.quit();
		this.redis = null;	
	}	
	return;
}


function connect() {
	//writeln("connected to redis server");
	return new RedisConnection();
}