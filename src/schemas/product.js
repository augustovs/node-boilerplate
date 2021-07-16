import * as yup from 'yup';

export default {
	create: {
		body: yup.object({
			name: yup.string().max(255).required(),
			price: yup.number().required()
		}).noUnknown()
	},
	find: {
		params: yup.object({
			slug: yup.string().required()
		}).noUnknown()
	}
};
