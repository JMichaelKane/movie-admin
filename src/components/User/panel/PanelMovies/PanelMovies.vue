<script setup lang="ts">
	import { watchPostEffect } from "vue";
	import type { DataTableColumns } from "naive-ui";
	import { NButton, NSpace, useNotification } from "naive-ui";
	import { AddCircleOutline, FlashOutline, RefreshCircleOutline } from "@vicons/ionicons5";
	import { ShowOrEdit, Movie, createDelayFunction } from "../../../../composables/User/public";
	import { paths } from "../../../../composables/User/path";
	import { GetMovies, GetMoviesByKeyword, DelMovie } from "../../../../composables/User/api";
	paths.value = [
		{
			name: "影片",
			params: null,
			to: "",
		},
	];
	const columns = ref<DataTableColumns<Movie>>([
		{
			title: "ID",
			key: "id",
			width: "100px",
			align: "center",
		},
		{
			title: "影片名",
			key: "name",
			width: "200px",
			ellipsis: true,
			align: "center",
			render(row: Movie, index: number) {
				return h(ShowOrEdit, {
					value: row.name,
					onUpdateValue(v: string) {
						data.value[index].name = v;
					},
				});
			},
		},
		{
			title: "时长",
			key: "duration",
			width: "100px",
			align: "center",
			render(row: Movie, index: number) {
				return h(ShowOrEdit, {
					value: row.duration,
					onUpdateValue(v: string) {
						data.value[index].duration = v;
					},
				});
			},
		},
		{
			title: "简介",
			key: "description",
			ellipsis: true,
			align: "center",
			render(row: Movie, index: number) {
				return h(ShowOrEdit, {
					value: row.description,
					onUpdateValue(v: string) {
						data.value[index].description = v;
					},
				});
			},
		},
		{
			title: "导演",
			key: "director",
			ellipsis: true,
			align: "center",
			width: "200px",
		},
		{
			title: "操作",
			key: "action",
			width: "150px",
			align: "center",
			render(row: Movie, index: number) {
				return h(
					NSpace,
					{
						justify: "center",
					},

					() =>
						h(
							NButton,
							{
								secondary: true,
								type: "error",
								size: "small",
								onClick: () => {
									DelMovie(row.id).then(() => {
										refresh();
										notification["success"]({
											duration: 2000,
											content: "删除",
											meta: "操作成功",
										});
									});
								},
							},
							() => "删除"
						)
				);
			},
		},
	]);
	const num: number = 20;
	const data = ref<Movie[]>([]); // 存储查询到的movie
	const keyword = ref<string>(""); // keyword
	const page = ref<number>(1);
	const pgCount = ref<number>(1);

	const search = createDelayFunction(GetMoviesByKeyword, 500); // 防抖函数

	let tmpKeyword: string;

	onMounted(() => {
		watchPostEffect(() => {
			if (keyword.value.trim() != "") {
				if (keyword.value.trim() != tmpKeyword) {
					page.value = 1;
					tmpKeyword = keyword.value.trim();
				}
				search(keyword.value, num, page.value, data, pgCount);
			} else {
				GetMovies(num, page.value, data, pgCount);
			}
		});
	});

	const notification = useNotification(); // 通知

	function refresh() {
		if (keyword.value.trim() != "") {
			search(keyword.value, 20, page.value, data, pgCount);
		} else {
			GetMovies(20, page.value, data, pgCount);
		}
	}
</script>

<template>
	<n-card title="影片管理" size="small">
		<template #header-extra>
			<n-space>
				<n-input v-model:value="keyword" placeholder="搜索" round>
					<template #prefix>
						<n-icon :component="FlashOutline" />
					</template>
				</n-input>
				<div style="display: flex; align-items: center; height: 100%">
					<n-button text type="primary" style="font-size: 24px" disabled>
						<n-icon>
							<add-circle-outline />
						</n-icon>
					</n-button>
				</div>
				<div style="display: flex; align-items: center; height: 100%">
					<n-button text type="info" style="font-size: 24px" @click="refresh">
						<n-icon>
							<refresh-circle-outline />
						</n-icon>
					</n-button>
				</div>
			</n-space>
		</template>
		<n-data-table :columns="columns" :data="data" :bordered="false" :single-line="false" />
		<div style="margin-top: 15px; margin-bottom: 10px">
			<n-space justify="center">
				<n-pagination v-model:page="page" :page-count="pgCount" />
			</n-space>
		</div>
	</n-card>
</template>

<style></style>
