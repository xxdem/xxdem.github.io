document.onreadystatechange = function () {
	if (document.readyState !== 'complete') {
		return;
	}
	const mergely = new Mergely('#mergely', {
		license: 'lgpl',
        wrap_lines: true
	});

    mergely.once('updated', () => {
        const f1 = fetch(location.search.substring(location.search.indexOf("link1=") + 6, location.search.indexOf("link2=")))
        .then(async (response) => {
				if (!response.ok) {
					console.error(response);
					return;
				}
                const text = await response.text();
				mergely.lhs(text);
			});

        const f2 = fetch(location.search.substring(location.search.indexOf("link2=") + 6))
            .then(async (response) => {
				if (!response.ok) {
					console.error(response);
					return;
				}
				const text = await response.text();
				mergely.rhs(text);
			});

        Promise.all([f1, f2]).then(() => {
            // once both files are fetched and rendered, scroll to first diff
            mergely.once('updated', () => {
                mergely.scrollToDiff('next');
            });
        });
    });
}
