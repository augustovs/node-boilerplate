export default class Utils {
	static getLikeValue(value) {
		return `%${(value || '').replace(/'/g, `${''}''`)}%`;
	}

	static queryCondition(condition, query, elseQuery) {
		return condition ? query : (elseQuery || '');
	}
}
