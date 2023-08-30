import domtoimage from 'dom-to-image';

export const extractUserName = (url: string): string => {
	return url.split('@')[1].split('/')[0];
};

export const extractPostID = (url: string): string => {
	const parts = url.split('/');
	const postIdIndex = parts.indexOf('post') + 1;
	const postId = parts[postIdIndex];

	return postId;
};

export const elementToImage = async (
	numOfElement: number,
): Promise<string[]> => {
	const elements = [];
	const dataURLs = [];

	[...new Array(numOfElement)].map((value, index) => {
		const element = document.querySelector(`.instagram-${index}`);
		elements.push(element);
		return '-';
	});

	const scale = 2;
	try {
		for (const element of elements) {
			const options = {
				height: element.offsetHeight * scale,
				style: {
					transform: `scale(${scale}) translate(${
						element.offsetWidth / 2 / scale
					}px, ${element.offsetHeight / 2 / scale}px)`,
				},
				width: element.offsetWidth * scale,
			};

			const dataURL = await domtoimage.toPng(element, options);

			dataURLs.push(dataURL);
		}
	} catch (error) {
		console.log(error);
		return [];
	}

	return dataURLs;
};
