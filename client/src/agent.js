import axios from 'axios'

const encode = encodeURIComponent;

const instance = axios.create({
	baseURL: 'http://localhost:8421/',
	timeout: 20000
})

let token = null;
const tokenPlugin = req => {
	if (token) {
		req.headers['Authorization'] = 'Bearer ' + token;
	}
	return req;
}

instance.interceptors.request.use(tokenPlugin)

const Auth = {
	current: () =>
		instance.get('/user'),
	save: user =>
		instance.put('/user', { user }),
	login: (email, password) =>
		instance.post('/users/login', { user: { email, password } }),
	logout: () =>
		instance.post('/user/logout'),
	register: (username, email, password) =>
		instance.post('/users', { user: { username, email, password } }),
};

const Tags = {
	all: () => instance.get('/tags'),
	popular: () => instance.get('/tags/popular'),
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })

const Articles = {
	all: page =>
		instance.get(`/articles?${limit(10, page)}`),
	feed: page =>
		instance.get(`/articles/feed?${limit(10, page)}`),
	byAuthor: (username, page) =>
		instance.get(`/articles?author=${encode(username)}&${limit(10, page)}`),
	byTag: (tag, page) =>
		instance.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
	bySlug: slug =>
		instance.get(`/articles/${slug}`),
	favoritedBy: (username, page) =>
		instance.get(`/articles?favorited=${encode(username)}&${limit(10, page)}`),

	create: article =>
		instance.post('/articles', { article }),
	favorite: slug =>
		instance.post(`/articles/${slug}/favorite`),

	update: article =>
		instance.put(`/articles/${article.slug}`, { article: omitSlug(article) }),

	del: slug =>
		instance.delete(`/articles/${slug}`),
	unfavorite: slug =>
		instance.delete(`/articles/${slug}/favorite`),
};

const Comments = {
	create: (slug, comment) =>
		instance.post(`/articles/${slug}/comments`, { comment }),
	del: (slug, commentId) =>
		instance.delete(`/articles/${slug}/comments/${commentId}`),
	forArticle: slug =>
		instance.get(`/articles/${slug}/comments`),
}

const Profile = {
	get: username =>
		instance.get(`/profiles/${username}`),
	follow: username =>
		instance.post(`/profiles/${username}/follow`),
	unfollow: username =>
		instance.delete(`/profiles/${username}/follow`),
}

const agent = {
	Articles,
	Auth,
	Comments,
	Profile,
	Tags,
	setToken: _token => { token = _token },
}

export default agent;
