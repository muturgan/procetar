export const procetar = (str) => crypto.subtle.digest("SHA-1",new TextEncoder().encode(str))
	.then((buf) => {
		let u8s = Array.from(new Uint8Array(buf)),
		d1 = "",
		d2 = "",
		rect = "h1v1h-1z";

		for (let i = 0; i < 16; i++) {
			let x = i % 4,
			y = Math.floor(i / 4),
			d = `M${ x } ${ y }${ rect }M${ 7 - x } ${ y }${ rect }M${ x } ${ 7 - y }${ rect }M${ 7 - x } ${ 7 - y }${ rect }`;
			u8s[i] < 128 ? d1 += d : d2 += d;
		}

		return URL.createObjectURL(
			new Blob(
				[`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><path fill="#${ u8s.slice(0, 3).map((n) => n.toString(16)).join("") }" d="${ d1 }"/><path fill="#fff" d="${ d2 }"/></svg>`],
				{type: "image/svg+xml"}
			)
		);
	}
);
