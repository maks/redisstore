export('connect', 'decode');

var DefaultCodec = Packages.org.jredis.ri.alphazero.support.DefaultCodec;

function connect() {
	return new Packages.org.jredis.ri.alphazero.JRedisClient();
}	


function decode(l) {
	var result;
	if (l) {
		result = [];
		for (var iterator = l.iterator(); iterator.hasNext();) {
			result.push(DefaultCodec.toStr(iterator.next()));				
		}
	}
	return result;	
}