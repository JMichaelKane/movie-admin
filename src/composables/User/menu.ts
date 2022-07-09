import { Component, Ref } from "vue";
import { RouterLink } from "vue-router";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { HomeOutline } from "@vicons/ionicons5";
import {
	Class20Regular,
	Library20Regular,
	MoviesAndTv20Regular,
	AppsList20Regular,
} from "@vicons/fluent";

function renderIcon(icon: Component) {
	return () => h(NIcon, null, { default: () => h(icon) });
}

let DefaultOptions: MenuOption[] = [
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: "panel",
					},
				},
				{ default: () => "仪表盘" }
			),
		key: "instrument-panel",
		icon: renderIcon(HomeOutline),
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: "source",
					},
				},
				{ default: () => "采集源" }
			),
		key: "source",
		icon: renderIcon(Library20Regular),
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: "category",
					},
				},
				{ default: () => "分类管理" }
			),
		key: "category-management",
		icon: renderIcon(Class20Regular),
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: "movies",
					},
				},
				{ default: () => "影片管理" }
			),
		key: "movie-management",
		icon: renderIcon(MoviesAndTv20Regular),
	},
];

const menuOptions: Ref<MenuOption[]> = ref([]);

function newDetail(label: string, key: number): MenuOption {
	return {
		label: label,
		key: key,
		children: [
			{
				label: () =>
					h(
						RouterLink,
						{
							to: {
								name: "source-detail-class",
								params: {
									id: key,
								},
							},
						},
						{ default: () => "采集类" }
					),
				key: String(key) + "-caiji",
			},
			{
				label: () =>
					h(
						RouterLink,
						{
							to: {
								name: "source-detail-movie",
								params: {
									id: key,
								},
							},
						},
						{ default: () => "影片" }
					),
				key: String(key) + "-movie",
			},
		],
		icon: renderIcon(AppsList20Regular),
	};
}

export { DefaultOptions, menuOptions, newDetail };
