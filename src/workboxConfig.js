export default function() {
	globDirectory: DIST_DIR,
	globPatterns: ['**/*.{html,js,css}'],
	swDest: path.join(DIST_DIR, 'sw.js'),
}