import * as yup from 'yup';

export default {
	list: {
		query: yup.object({
			name: yup.string()
		}).noUnknown()
	}
};
