import { ref,computed } from "vue";
import { SelectOption } from "naive-ui";
import { Category, Source, Movie } from "./public";

const LogInEd = ref<boolean>(false);

const sources = ref<Source[]>([]); // 采集源

const categories = ref<Category[]>([]); // 自建分类

const movies = ref<Movie[]>([]); //影片

const moviesNum = ref<number>(0); //影片数目

// const sourceDetail: Map<number, Class[]> = new Map(); // 采集源详细信息

// 根据id搜索source
function findSource(id: number): Source {
	let source: Source = {
		id: -1,
		name: "",
		url: "",
		complete: false,
		getting: false,
	};
	console.log(sources.value);
	for (let i = 0; i < sources.value.length; i++) {
		if (sources.value[i].id == id) {
			source = sources.value[i];
			break;
		}
	}
	return source;
}

const CategoryList = computed(() => {
	let result: SelectOption[] = [];
	result.push({
		label: "未分类",
		value: 0,
	});
	for (const category of categories.value) {
		result.push({
			label: category.name,
			value: category.id,
		});
	}
	return result;
});

export { sources, moviesNum, categories, movies, LogInEd, CategoryList, findSource };
