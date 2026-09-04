import { t as _plugin_vue_export_helper_default } from "../server.mjs";
import { defineComponent, isRef, mergeModels, mergeProps, ref, unref, useModel, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderTeleport } from "vue/server-renderer";
//#region app/components/HeroSection.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<section${ssrRenderAttrs(mergeProps({ class: "hero" }, _attrs))}><div><p class="eyebrow">NUXT 4 · VUE 3 · TYPESCRIPT</p><h1>AI-assisted software development, explained clearly.</h1><p class="lede">This portfolio documents how AI supports requirement analysis, Nuxt architecture, implementation, review, debugging, prototyping, and final delivery — while the developer owns validation and decisions.</p><div class="actions"><a class="button primary" href="#workflow">Explore workflow</a><a class="button" href="#demo">View existing demo</a></div></div><aside class="terminal"><div class="terminal-bar"><span>● ● ●</span><b>BUILD SESSION</b><em>READY</em></div><pre><span>&gt; read assignment and existing demo</span>
✓ scope identified
<span>&gt; plan Nuxt 4 architecture</span>
✓ pages + components + public demo
<span>&gt; implement portfolio</span>
✓ TypeScript source created
<span>&gt; build and review</span>
✓ developer validates result</pre></aside></section>`);
}
var _sfc_setup$5 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var HeroSection_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "HeroSection" });
//#endregion
//#region app/components/AiToolCard.vue?vue&type=script&setup=true&lang.ts
var AiToolCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AiToolCard",
	__ssrInlineRender: true,
	props: {
		tool: {},
		usedFor: {},
		how: {},
		output: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<article${ssrRenderAttrs(mergeProps({ class: "tool-card" }, _attrs))}><p class="label">AI TOOL</p><h3>${ssrInterpolate(__props.tool)}</h3><dl><dt>Used for</dt><dd>${ssrInterpolate(__props.usedFor.join(" · "))}</dd><dt>How I use it</dt><dd>${ssrInterpolate(__props.how)}</dd><dt>Example output</dt><dd>${ssrInterpolate(__props.output)}</dd></dl></article>`);
		};
	}
});
//#endregion
//#region app/components/AiToolCard.vue
var _sfc_setup$4 = AiToolCard_vue_vue_type_script_setup_true_lang_default.setup;
AiToolCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AiToolCard.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var AiToolCard_default = Object.assign(AiToolCard_vue_vue_type_script_setup_true_lang_default, { __name: "AiToolCard" });
//#endregion
//#region app/components/WorkflowStep.vue?vue&type=script&setup=true&lang.ts
var WorkflowStep_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "WorkflowStep",
	__ssrInlineRender: true,
	props: {
		number: {},
		title: {},
		tool: {},
		task: {},
		input: {},
		output: {},
		decision: {},
		result: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<article${ssrRenderAttrs(mergeProps({ class: "workflow-card" }, _attrs))}><div class="step-title"><span>${ssrInterpolate(String(__props.number).padStart(2, "0"))}</span><div><p class="label">WORKFLOW STEP</p><h3>${ssrInterpolate(__props.title)}</h3></div><b class="status">${ssrInterpolate(__props.tool)}</b></div><div class="workflow-grid"><div><small>AI Tool</small><p>${ssrInterpolate(__props.tool)}</p></div><div><small>Task</small><p>${ssrInterpolate(__props.task)}</p></div><div><small>Input / Prompt / Context</small><p>${ssrInterpolate(__props.input)}</p></div><div><small>AI Output</small><p>${ssrInterpolate(__props.output)}</p></div><div><small>Developer Decision</small><p>${ssrInterpolate(__props.decision)}</p></div><div><small>Result</small><p>${ssrInterpolate(__props.result)}</p></div></div></article>`);
		};
	}
});
//#endregion
//#region app/components/WorkflowStep.vue
var _sfc_setup$3 = WorkflowStep_vue_vue_type_script_setup_true_lang_default.setup;
WorkflowStep_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WorkflowStep.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var WorkflowStep_default = Object.assign(WorkflowStep_vue_vue_type_script_setup_true_lang_default, { __name: "WorkflowStep" });
//#endregion
//#region app/components/DemoCard.vue?vue&type=script&setup=true&lang.ts
var DemoCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DemoCard",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		title: {},
		flow: {},
		description: {}
	}, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: ["update:open"],
	setup(__props) {
		useModel(__props, "open");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<article${ssrRenderAttrs(mergeProps({ class: "demo-card" }, _attrs))}><p class="label">EXISTING RESULT / INTERACTIVE PROTOTYPE</p><h3>${ssrInterpolate(__props.title)}</h3><p>${ssrInterpolate(__props.description)}</p><div class="flow"><!--[-->`);
			ssrRenderList(__props.flow, (item, index) => {
				_push(`<!--[--><span>${ssrInterpolate(item)}</span>`);
				if (index < __props.flow.length - 1) _push(`<i>→</i>`);
				else _push(`<!---->`);
				_push(`<!--]-->`);
			});
			_push(`<!--]--></div><div class="card-actions"><button class="button primary">View Demo</button><a class="button" href="/demos/freightlink_ai_shipping_rate_demo.html" target="_blank" rel="noopener">Open Full Demo ↗</a></div></article>`);
		};
	}
});
//#endregion
//#region app/components/DemoCard.vue
var _sfc_setup$2 = DemoCard_vue_vue_type_script_setup_true_lang_default.setup;
DemoCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DemoCard.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var DemoCard_default = Object.assign(DemoCard_vue_vue_type_script_setup_true_lang_default, { __name: "DemoCard" });
//#endregion
//#region app/components/EvidenceCard.vue?vue&type=script&setup=true&lang.ts
var EvidenceCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "EvidenceCard",
	__ssrInlineRender: true,
	props: {
		title: {},
		text: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<article${ssrRenderAttrs(mergeProps({ class: "evidence-card" }, _attrs))}><p class="label">EVIDENCE AREA</p><h3>${ssrInterpolate(__props.title)}</h3><p>${ssrInterpolate(__props.text)}</p><div class="todo">TODO: Add actual prompt, sanitized screenshot, diff, or build output.</div></article>`);
		};
	}
});
//#endregion
//#region app/components/EvidenceCard.vue
var _sfc_setup$1 = EvidenceCard_vue_vue_type_script_setup_true_lang_default.setup;
EvidenceCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EvidenceCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var EvidenceCard_default = Object.assign(EvidenceCard_vue_vue_type_script_setup_true_lang_default, { __name: "EvidenceCard" });
//#endregion
//#region app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const tools = [
			{
				tool: "ChatGPT",
				usedFor: [
					"Requirement analysis",
					"Architecture discussion",
					"Documentation / prototype"
				],
				how: "Provide the assignment, constraints, and the specific engineering question; refine context and validate responses.",
				output: "Development plan, design options, explanation, or prototype direction."
			},
			{
				tool: "Gemini",
				usedFor: [
					"Technical Q&A",
					"Compare solutions",
					"Second opinion"
				],
				how: "Use selectively to compare an approach with another assistant before making a decision.",
				output: "Alternative explanation or implementation consideration."
			},
			{
				tool: "OpenAI Codex",
				usedFor: [
					"Read project context",
					"Implement components",
					"Build / fix"
				],
				how: "Give the workspace requirement, inspect source files, then create or modify scoped project files.",
				output: "Nuxt source changes, reviewable diff, and build fixes."
			},
			{
				tool: "Antigravity IDE / CLI",
				usedFor: ["Example prior workflow"],
				how: "This is an example workflow only; it is not claimed as used for this portfolio build.",
				output: "TODO: Add a real, sanitized example if applicable."
			},
			{
				tool: "NotebookLM",
				usedFor: ["Summarize documents", "Presentation structure"],
				how: "Provide project information or research documents and organize the resulting outline.",
				output: "Summary and presentation-ready structure."
			}
		];
		const steps = [
			[
				"Understand requirement",
				"ChatGPT",
				"Analyze assignment, constraints, scope, and required proof.",
				"Assignment text, mandatory Nuxt 4 requirement, existing Demo instruction.",
				"Structured requirement and development plan.",
				"Confirm Nuxt 4 is mandatory; keep content accurate and use placeholders where facts are unknown.",
				"Clear scope for a Nuxt 4 workflow portfolio."
			],
			[
				"Plan Nuxt 4 architecture",
				"ChatGPT + Codex",
				"Plan app pages, components, assets, and public demo integration.",
				"Required sections, component boundaries, public asset path, and TypeScript requirement.",
				"Project structure and component plan.",
				"Keep the demo standalone in public rather than rewrite a working interactive artifact.",
				"Maintainable Nuxt 4 source layout."
			],
			[
				"Build with Codex",
				"OpenAI Codex",
				"Create pages, components, styling, navigation, and responsive behavior.",
				"Scoped requirement plus the project workspace and files.",
				"Nuxt Vue components and TypeScript source.",
				"Review generated changes; ensure workflow details are not overstated as evidence.",
				"A runnable Nuxt portfolio."
			],
			[
				"Prototype / demo",
				"ChatGPT (existing result)",
				"Present a real interactive prototype as a workflow result.",
				"Existing FreightLink HTML demo and its user flow.",
				"Standalone interactive Shipping Rate Agent prototype.",
				"Preserve the original demo; describe it as a prototype with simulated data.",
				"Viewable LINE → orchestration → browser → extraction → LINE result."
			],
			[
				"Review and debug",
				"Codex / ChatGPT / Gemini",
				"Review source, errors, build output, and possible improvements.",
				"Sanitized code, build errors, or technical context — never secrets.",
				"Issue analysis, suggested fix, or a review direction.",
				"Validate applicability, test changes, and retain ownership of the final fix.",
				"More reliable source and documented build result."
			],
			[
				"Final build and presentation",
				"Codex / NotebookLM",
				"Build the project and summarize the workflow for an audience.",
				"Project source, build command, and project information.",
				"Build output and presentation structure.",
				"Run build, resolve errors, and ensure claims match evidence.",
				"NuxtJS v4 portfolio ready for review."
			]
		];
		const evidence = [
			["Prompt / context", "Use this area for a real prompt screenshot or sanitized context sent to an AI assistant."],
			["Code review / diff", "Use this area for actual before-after changes reviewed by the developer."],
			["Build result", "Use this area for real npm run build output after the final build."]
		];
		const demoOpen = ref(false);
		const navOpen = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_HeroSection = HeroSection_default;
			const _component_AiToolCard = AiToolCard_default;
			const _component_WorkflowStep = WorkflowStep_default;
			const _component_DemoCard = DemoCard_default;
			const _component_EvidenceCard = EvidenceCard_default;
			_push(`<!--[--><header class="nav"><a class="brand" href="#top">Kawinpat <small>BACKEND / FULL-STACK</small></a><button class="menu"${ssrRenderAttr("aria-expanded", unref(navOpen))} aria-label="Toggle navigation">☰</button><nav class="${ssrRenderClass({ open: unref(navOpen) })}"><a href="#tools">AI Tools</a><a href="#workflow">Workflow</a><a href="#demo">Demo</a><a href="#evidence">Evidence</a><a href="#about">About</a></nav></header><main id="top"><div class="wrap">`);
			_push(ssrRenderComponent(_component_HeroSection, null, null, _parent));
			_push(`</div><section id="tools" class="section dark"><div class="wrap"><p class="eyebrow">AI TOOLS I USE</p><h2>What each tool contributes.</h2><p class="section-lede">The cards below distinguish actual assistance from example-only workflow. They are not claims of activity or results without supporting evidence.</p><div class="tools"><!--[-->`);
			ssrRenderList(tools, (tool) => {
				_push(ssrRenderComponent(_component_AiToolCard, mergeProps({ key: tool.tool }, { ref_for: true }, tool), null, _parent));
			});
			_push(`<!--]--></div></div></section><section id="workflow" class="section"><div class="wrap"><p class="eyebrow">MY AI DEVELOPMENT WORKFLOW</p><h2>From task to validated result.</h2><p class="section-lede">Every workflow card records the tool, task, context, AI output, developer decision, and outcome — the core of this assignment.</p><div class="workflow"><!--[-->`);
			ssrRenderList(steps, (step, index) => {
				_push(ssrRenderComponent(_component_WorkflowStep, {
					key: step[0],
					number: index + 1,
					title: step[0],
					tool: step[1],
					task: step[2],
					input: step[3],
					output: step[4],
					decision: step[5],
					result: step[6]
				}, null, _parent));
			});
			_push(`<!--]--></div></div></section><section id="demo" class="section dark"><div class="wrap"><p class="eyebrow">EXISTING INTERACTIVE DEMO</p><h2>FreightLink AI — Shipping Rate Agent</h2>`);
			_push(ssrRenderComponent(_component_DemoCard, {
				open: unref(demoOpen),
				"onUpdate:open": ($event) => isRef(demoOpen) ? demoOpen.value = $event : null,
				title: "Shipping Rate Agent Prototype",
				flow: [
					"LINE request",
					"AI orchestration",
					"Browser automation",
					"Rate extraction",
					"LINE response"
				],
				description: "An existing interactive prototype demonstrating a simulated shipping-rate workflow. It remains a standalone HTML artifact so its original interactions can be opened directly."
			}, null, _parent));
			_push(`</div></section><section id="evidence" class="section"><div class="wrap"><p class="eyebrow">EVIDENCE / PROOF AREAS</p><h2>Reserve claims for real artifacts.</h2><div class="evidence"><!--[-->`);
			ssrRenderList(evidence, (item) => {
				_push(ssrRenderComponent(_component_EvidenceCard, {
					key: item[0],
					title: item[0],
					text: item[1]
				}, null, _parent));
			});
			_push(`<!--]--></div></div></section><section id="about" class="section dark"><div class="wrap about"><div><p class="eyebrow">DEVELOPER RESPONSIBILITY</p><h2>AI helps. The developer remains accountable.</h2><p class="lede">I remain responsible for understanding requirements, architecture, business logic, code validation, security, testing, performance, and production decisions.</p></div><aside class="responsibility"><p>AI = <b>accelerator</b></p><p>Developer = <b>decision maker</b></p></aside></div></section></main><footer>TODO: Replace <b>Kawinpat</b> and add verified contact details before sharing.</footer>`);
			ssrRenderTeleport(_push, (_push) => {
				if (unref(demoOpen)) _push(`<div class="modal" role="dialog" aria-modal="true" aria-label="FreightLink demo preview"><div class="modal-content"><button class="close" aria-label="Close demo preview">×</button><h2>FreightLink AI Demo Preview</h2><p>Preview may be constrained on narrow screens; open the full demo for its original desktop experience.</p><iframe src="/demos/freightlink_ai_shipping_rate_demo.html" title="FreightLink AI Shipping Rate Demo"></iframe><div class="card-actions"><a class="button primary" href="/demos/freightlink_ai_shipping_rate_demo.html" target="_blank" rel="noopener">Open Full Demo ↗</a></div></div></div>`);
				else _push(`<!---->`);
			}, "body", false, _parent);
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;
//#endregion
export { pages_default as default };

//# sourceMappingURL=pages-Bf6LCsFs.js.map