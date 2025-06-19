import { component$ } from "@builder.io/qwik";
import { isDev } from "@builder.io/qwik/build";
import {
	QwikCityProvider,
	RouterOutlet,
	ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Don't remove the `<head>` and `<body>` elements.
	 */

	return (
		<QwikCityProvider>
			<head>
				<meta charset="utf-8" />
				<link rel="stylesheet" href="/src/styles/css/index.css" />
				<link rel="stylesheet" href="/src/styles/css/tailwind.css" />
				<link rel="stylesheet" href="/src/styles/css/prism.css" />
				{!isDev && (
					<link
						rel="manifest"
						href={`${import.meta.env.BASE_URL}manifest.json`}
					/>
				)}
				<RouterHead />
			</head>
			<body class="bg-black-900" lang="sk">
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-KQFH8PWL"
						height="0"
						width="0"
						title="Google Tag Manager"
						style={{ display: "none", visibility: "hidden" }}
					></iframe>
				</noscript>
				<RouterOutlet />
				{!isDev && <ServiceWorkerRegister />}
			</body>
		</QwikCityProvider>
	);
});
