<script>
	import { tweened } from "svelte/motion";
	import { cubicIn } from "svelte/easing";
	import { draw } from "svelte/transition";
	import { onMount } from "svelte";

	export let step;

	const fullW = 1028;
	const w = 1030;
	const h = 842;
	const drawParams = { duration: 2500, easing: cubicIn };

	let pathEl;
	let pathLength;
	let strokeOffset;

	const viewBox = tweened([fullW - w, 0, w / 5, h / 5], {
		duration: 1800,
		easing: cubicIn
	});
	const zooms = [0.2, 0.2, 0.28, 0.4, 0.6, 1];
	const pathPcts = [0, 0.12, 0.18, 0.25, 0.35, 1];

	const stepChange = () => {
		if (step === undefined) return;
		$viewBox = [fullW - w, 0, w * zooms[step], h * zooms[step]];
		strokeOffset = -1 * pathLength * (1 - pathPcts[step]);
	};

	$: step, stepChange();

	onMount(() => {
		pathLength = pathEl.getTotalLength() - (fullW - w);
		strokeOffset = -1 * pathLength;
	});
</script>

<div class="maze">
		<svg
		id="intro-maze"
		width="100%"
		height="100%"
		viewBox={$viewBox.join(" ")}
		fill="none"
		preserveAspectRatio="xMinYMin"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path 
			id="path" 
			bind:this={pathEl}
			style:stroke-dasharray={pathLength}
			style:stroke-dashoffset={strokeOffset}
			d="M991.373 841.312V829.168H898.366V781.297H828.612V759.413H802.625V781.297H782.108V829.168H757.489V781.297H732.87V759.413H664.482V781.297H596.095V826.432H455.85V735.477H385.463V781.297H315.708V829.168H59.2897V803.864H175.515V685.555H152.947V592.548H81.6948V570.323H107.34V522.452H81.6948V479.026V457.142L107.34 453.039V407.903H129.695V386.019V295.201V267.368H59.2897V245.398H198.124V106.914H107.34V83.3208H81.6948V151.537H13.735V13.5659H0.5"
			stroke="#6B50DC"
			stroke-width="5"
		/>
		<g id="walls">
			<path id="Vector" d="M514.648 583.013H490.812V653.584" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_2" d="M816.976 327.666H793.432C793.432 274.5 721.894 281.099 700.315 281.099H654.408" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_3" d="M793.447 357.303C793.447 363.673 794.061 366.773 793.156 376.703C791.252 397.715 782.55 420.783 746.881 420.783H676.939V443.621" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_4" d="M839.998 373.895V397.5H816.976L810.867 350.949H886.564V373.895H863.281V397.5H909.848V513.901H886.564" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_5" d="M654.408 420.553H560.646" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_6" d="M582.425 397.178H605.724" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_7" d="M536.841 420.783H443.555V444.066" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_8" d="M560.508 513.9H530.241" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_9" d="M514.095 327.497V350.949V397.178" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_10" d="M420.978 327.343V257.832" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_11" d="M420.272 281.1H304.577C320.77 281.1 327.861 270.279 327.861 257.816" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_12" d="M164.894 281.099H211.184H280.588C264.396 281.099 257.305 270.279 257.305 257.816H234.728V211.25H257.903" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_13" d="M444.246 397.178V374.217" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_14" d="M338.681 537.184V444.066C338.681 423.838 360.521 420.783 397.679 420.783H420.962" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_15" d="M258.303 420.783H234.037V466.429" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_16" d="M804.083 444.066V537.184C804.083 557.413 782.243 560.467 745.085 560.467H723.582" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_17" d="M886.564 420.783H803.96V537.184C803.96 557.413 825.801 560.467 862.959 560.467V583.75" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_18" d="M933.115 420.553V397.5H1026.23V583.735H886.564V560.467H1002.96" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_19" d="M1002.97 444.066V420.553H956.399" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_20" d="M956.399 490.617H1002.97V467.549H933.115V444.066H979.682" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_21" d="M909.909 535.725H1002.97V513.9H933.116V490.617" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_22" d="M630.572 303.922V281.1H560.646V188.412" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_23" d="M537.363 281.099H490.812V211.756H467.529" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_24" d="M467.391 281.1H420.272" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_25" d="M211.46 94.8647V257.832H71.7764" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_26" d="M211.46 397.178V304.383" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_27" d="M188.177 281.1V374.217" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_28" d="M164.894 397.5V303.922" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_29" d="M188.361 420.783H164.894L145.34 466.429H95.0596" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_30" d="M141.488 443.268H118.343V420.553H141.626V397.5" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_31" d="M95.0596 512.719V490.725L141.488 490.096" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_32" d="M118.266 512.719V560.467H188.177" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_33" d="M188.177 560.467H258.011V535.864" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_34" d="M280.588 560.467H304.577H316.319H338.804" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_35" d="M630.496 490.725V560.467H560.646V537.183" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_36" d="M619.629 560.467H700.33V537.184" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_37" d="M700.437 560.467C723.49 561.081 793.555 554.113 793.555 607.294H816.853V583.75" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_38" d="M630.572 700.135H746.988C799.494 700.135 793.554 650.699 793.554 630.854H840.136V607.279H863.419" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_39" d="M374.412 676.131V700.135H281.294" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_40" d="M467.529 700.135V769.969V816.536H583.929V723.418H490.812V793.253H560.646V746.702H514.095V769.969H537.363" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_41" d="M374.411 700.135H444.246" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_42" d="M444.246 700.135H583.929" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_43" d="M583.929 723.418H607.212V769.969H654.07" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_44" d="M629.897 816.536H654.07V793.253H607.212V839.819H467.529H444.246V746.702" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_45" d="M700.591 723.418H677.584H630.572V700.135H607.212" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_46" d="M258.011 187.982H234.037V141.431H304.577" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_47" d="M327.753 141.37V118.854" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_48" d="M839.998 350.473V281.1H792.25" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_49" d="M816.976 281.1V303.922" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_50" d="M793.447 235.116V257.832H770.164V187.997C770.164 170.224 765.022 141.431 723.582 141.431H653.671V164.714" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_51" d="M675.558 327.436V350.949" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_52" d="M653.671 235.039V211.265H676.955" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_53" d="M956.399 373.894H909.848V327.436H863.419" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_54" d="M979.682 373.895H1026.23V397.5" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_55" d="M933.115 303.922H863.281V164.714" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_56" d="M956.399 281.099H886.564V211.756H909.848" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_57" d="M909.909 257.832H979.682V327.435H933.116V350.949" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_58" d="M956.399 327.436V303.922" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_59" d="M956.399 350.673H1002.97V373.895" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_60" d="M1026.23 373.894V327.436V235.116V141.431H909.848V234.548H1002.96V164.714H933.115V211.265H979.682V188.412H956.399" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_61" d="M1026.23 327.436H1002.96" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_62" d="M979.682 304.383H1002.97" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_63" d="M1026.23 281.1H1002.96" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_64" d="M979.682 257.832H1002.97" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_65" d="M863.419 187.982H886.564V141.431" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_66" d="M863.281 257.663H816.976V234.318H840.136V118.148H863.419V141.37" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_67" d="M909.848 607.279H956.399V583.873" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_68" d="M956.399 607.279H1002.97V653.584H956.399V630.854H979.682" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_69" d="M1026.23 583.735V700.135H1002.97V676.852H956.399" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_70" d="M933.115 607.279V746.702" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_71" d="M909.909 676.99H863.281" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_72" d="M839.998 700.135H863.42V769.969H839.998V746.702H793.647V769.969" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_73" d="M607.212 746.701H723.613V723.234H839.998V653.216H886.564V630.854H909.909V700.396L886.595 700.135V769.969" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_74" d="M909.909 700.396V793.252" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_75" d="M746.819 723.863V771.918" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_76" d="M770.164 723.863V816.536" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_77" d="M607.212 839.819H677.584V770.2H700.207V816.536" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_78" d="M677.584 839.819H723.613V770.2" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_79" d="M723.613 839.819H746.881V793.252" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_80" d="M746.881 839.819H793.647V793.252H886.595V816.536" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_81" d="M816.132 793.253V770.2" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_82" d="M793.647 839.819H936.75M909.909 770.2H933.116V816.562" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_83" d="M816.976 839.819V816.536" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_84" d="M840.136 793.252V816.536" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_85" d="M863.281 839.819V816.536" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_86" d="M933.115 700.135H979.682V723.864H956.399V746.333H1002.97V816.536H956.399V769.969" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_87" d="M979.682 723.864H1026.23V700.135" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_88" d="M1026.23 723.863V839.819H1002.96" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_89" d="M979.682 747.898V793.252" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_90" d="M467.391 723.418H397.695V700.135" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_91" d="M420.164 746.702V816.536H351.128V839.819" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_92" d="M1.95752 2.13135H1026.23V141.431" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_93" d="M444.246 839.819H71.7763H1.95752V25.0308" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_94" d="M397.695 746.333V793.252H328.781V839.819" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_95" d="M234.743 816.536H304.577V770.2H374.411V746.333V723.418H234.743" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_96" d="M374.412 746.333H279.805" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_97" d="M211.46 653.584H188.177V583.735H95.0596" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_98" d="M211.46 723.418H188.039V676.852H164.894V653.584V607.018H188.177" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_99" d="M234.037 769.969H188.039V816.536H211.46V793.253H281.294V769.969H258.302V723.418" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_100" d="M188.039 816.536H71.7764" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_101" d="M48.4932 839.819V746.701H71.7763V793.252H164.894V746.333" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_102" d="M25.2253 816.536V723.418" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_103" d="M95.0596 723.418V769.969" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_104" d="M118.266 793.069V746.702" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_105" d="M141.488 723.418V769.969" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_106" d="M48.4932 723.418H164.894V700.135H141.488V607.279H25.2253V700.135H118.343V630.854H48.4932V676.852H95.0595V653.584H71.7763" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_107" d="M1.95752 653.584H25.2253" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_108" d="M48.4932 606.296V560.467" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_109" d="M48.4932 583.873H25.2253V535.925" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_110" d="M1.95752 512.719H71.7763" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_111" d="M48.4932 537.184H95.0595V560.467" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_112" d="M71.7764 606.296V560.467" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_113" d="M71.7763 490.725H25.2253V374.217H118.266V280.839H1.95752" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_114" d="M25.2253 350.949H95.0595V327.666H25.2253V304.383H95.0595V281.1" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_115" d="M25.2253 466.429H71.7763V444.066H48.4932V397.04H118.343" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_116" d="M71.7764 397.04V420.553H95.0595V443.36" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_117" d="M48.4932 257.832H1.95752" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_118" d="M25.2253 257.663V188.412H48.4932V235.116H95.0595H188.177V118.148H118.266V211.756H164.894V141.431H141.626V188.412" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_119" d="M1.95752 164.714H71.7763V211.756H95.0595" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_120" d="M211.46 118.148H350.99V164.714" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_121" d="M327.861 211.265H351.128" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_122" d="M350.99 141.37H397.695" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_123" d="M420.87 141.631V118.148H372.923" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_124" d="M537.363 164.714V141.37H467.437L443.954 141.232H444.153V94.8647H327.308" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_125" d="M514.095 94.8649H467.391V118.148H536.841V48.314" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_126" d="M583.837 141.431H560.646V48.314" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_127" d="M607.212 141.631V118.148H583.929V71.5972" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_128" d="M630.572 141.37V94.8647H607.212" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_129" d="M653.671 141.431V48.314" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_130" d="M607.212 71.5969H630.572V25.0305H699.869V1.7627" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_131" d="M677.369 141.431V71.5972" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_132" d="M676.955 48.314H723.613H792.25" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_133" d="M700.33 48.314V118.148" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_134" d="M723.582 141.431V71.5972" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_135" d="M746.881 48.314V118.148" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_136" d="M769.105 175.182V71.5972" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_137" d="M770.164 118.117H816.132V211.756H793.647V141.37" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_138" d="M723.613 25.0308H793.14H816.73V48.314H839.998V2.13135" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_139" d="M793.14 71.5972H886.564" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_140" d="M793.647 94.8647H956.399V141.37" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_141" d="M979.682 118.117V71.5972" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_142" d="M1002.96 141.37V94.8647" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_143" d="M1026.23 71.5971H956.399V48.3139V25.0308H1002.97V48.3139H979.682" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_144" d="M956.399 25.0308H933.115V71.5971H909.909V48.3139H863.281" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_145" d="M909.909 2.13135V25.215H863.281" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_146" d="M607.212 48.314V2.13135" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_147" d="M583.929 48.314V25.215H514.095V2.13135" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_148" d="M467.529 71.5971H514.095V48.314H490.812V2.13135" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_149" d="M886.564 118.148H933.115V141.37" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_150" d="M95.0596 188.412V94.8647" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_151" d="M48.4932 2.13135V48.314H25.2253V141.631H71.7763V71.5971V48.314V25.215H141.488" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_152" d="M25.2253 2.13135V25.215" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_153" d="M48.4932 48.314V71.8887V94.8649" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_154" d="M48.5085 141.37V118.117" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_155" d="M71.7764 48.314H164.894H258.303" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_156" d="M71.7764 71.5972H118.343V94.865H188.039" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_157" d="M141.626 48.314V71.8888" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_158" d="M211.46 48.3138V71.597H281.294V25.2148" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_159" d="M234.037 71.8887V94.8649H304.577V118.148" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_160" d="M164.894 48.3138V25.2148H234.743" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_161" d="M258.303 2.13135V25.0308" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_162" d="M281.294 48.406H304.577V71.8887H375.179V25.0307H328.244V1.74756" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_163" d="M420.272 48.4521H444.246V71.8887H397.695V25.0308H467.529V48.3139" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_164" d="M352.663 48.4521H328.244V25.0308H304.577" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_165" d="M606.629 583.013H630.573" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_166" d="M933.115 839.819H979.682" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_167" d="M583.837 349.153V373.895" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_168" d="M165.032 94.8649V71.8887" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_169" d="M141.626 281.1V397.5H211.46C211.46 397.5 209.787 420.783 234.037 420.783" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_170" d="M420.164 609.458V595.584C420.164 566.576 390.65 560.467 353.477 560.467H338.804V537.184V444.066C338.804 423.838 316.963 420.783 279.805 420.783V394.799" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_171" d="M537.639 560.467H442.757V537.184" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_172" d="M281.294 700.135H258.303H211.46V653.216" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_173" d="M234.743 606.296H269.307" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_174" d="M723.613 700.135H816.976V653.584" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_175" d="M490.72 302.863H467.467" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_176" d="M397.695 350.949V397.04" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_177" d="M327.738 350.949V397.04" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_178" d="M840.136 630.854H863.419H886.442" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_179" d="M840.136 607.279V583.873" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_180" d="M269.307 630.854H258.011L258.303 675.839H234.605V630.854H211.46V583.382H258.011" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_181" d="M325.282 238.815C323.624 242.744 321.276 246.105 318.207 248.914C315.137 251.723 311.438 253.902 307.11 255.483C302.782 257.048 297.962 257.831 292.667 257.831C287.372 257.831 282.461 257.048 278.163 255.483C273.866 253.917 270.228 251.723 267.235 248.914C264.242 246.105 261.94 242.744 260.329 238.815C258.717 234.886 257.919 230.527 257.919 225.754V164.714H281.217V209.177C281.217 211.342 281.709 222.914 282.077 224.909C282.875 229.13 284.563 235.116 292.775 235.116C300.986 235.116 302.997 229.406 303.718 224.909C304.04 222.914 304.516 211.357 304.516 209.177V164.714H327.753V225.754C327.753 230.542 326.924 234.901 325.282 238.815Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_182" d="M397.603 257.831L374.12 211.127L374.519 257.831H351.036V164.714H374.32L397.603 215.117V164.714H420.886V257.831H397.603Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_183" d="M444.154 257.831V164.714H467.437V257.831H444.154Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_184" d="M537.225 187.89V257.831H513.896V187.89H490.705V164.714H560.539V187.89H539.417H537.225Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_185" d="M583.837 257.831V164.714H653.672V188.166H611.771V199.815H630.388V223.144H611.771V235.039H653.672V257.831H583.837Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_186" d="M758.96 211.004C758.96 219.154 757.763 226.199 755.368 232.108C752.974 238.032 749.812 242.898 745.883 246.704C741.954 250.526 737.534 253.319 732.592 255.115C727.665 256.911 721.173 257.816 716.108 257.816H676.955V164.699H711.856C717.059 164.699 727.097 165.466 732.177 167.001C737.242 168.536 741.77 171.084 745.73 174.629C749.69 178.174 752.882 182.932 755.322 188.903C757.747 194.873 758.975 202.225 758.975 211.004H758.96ZM735.4 211.649C735.4 207.136 734.725 203.391 733.374 200.429C732.024 197.452 730.213 195.088 727.957 193.323C725.7 191.558 723.122 190.299 720.252 189.547C717.366 188.795 702.939 188.427 699.869 188.427V235.131H711.749C714.941 235.131 717.182 234.732 720.144 233.95C723.091 233.167 725.7 231.862 727.957 230.051C730.213 228.24 732.024 225.846 733.374 222.838C734.725 219.829 735.4 216.115 735.4 211.664V211.649Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_187" d="M443.417 489.205C443.417 496.158 442.25 502.512 439.948 508.252C437.631 514.008 434.407 518.919 430.294 523.017C426.181 527.115 421.285 530.277 415.606 532.518C409.927 534.759 403.773 535.864 397.142 535.864C390.512 535.864 384.373 534.743 378.74 532.518C373.107 530.277 368.226 527.115 364.113 523.017C360 518.919 356.776 513.992 354.459 508.252C352.141 502.497 350.99 496.158 350.99 489.205C350.99 482.252 352.141 475.822 354.459 470.158C356.776 464.495 360 459.675 364.113 455.7C368.226 451.725 373.107 448.671 378.74 446.522C384.373 444.373 390.512 443.299 397.142 443.299C403.773 443.299 409.927 444.373 415.606 446.522C421.285 448.671 426.181 451.74 430.294 455.7C434.407 459.675 437.631 464.495 439.948 470.158C442.266 475.822 443.417 482.176 443.417 489.205ZM420.272 489.359C420.272 486.105 419.704 483.066 418.553 480.227C417.417 477.402 415.821 474.977 413.81 472.951C411.784 470.941 409.359 469.345 406.489 468.178C403.619 467.012 400.488 466.429 397.065 466.429C393.643 466.429 390.512 467.012 387.688 468.178C384.864 469.345 382.423 470.941 380.367 472.951C378.31 474.962 376.729 477.387 375.624 480.227C374.519 483.051 373.966 486.105 373.966 489.359C373.966 492.612 374.534 495.882 375.685 498.752C376.821 501.622 378.402 504.078 380.428 506.134C382.439 508.191 384.864 509.802 387.688 510.969C390.512 512.135 393.627 512.719 397.065 512.719C400.503 512.719 403.619 512.135 406.443 510.969C409.267 509.802 411.708 508.191 413.764 506.134C415.821 504.078 417.417 501.622 418.568 498.752C419.704 495.882 420.272 493.204 420.272 489.812V489.359Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_188" d="M302.95 505.919C302.95 501.729 301.723 498.828 299.267 497.201C296.811 495.59 293.542 494.776 289.444 494.776H279.805V517.921H289.552C291.04 517.921 292.59 517.753 294.187 517.415C295.783 517.077 297.241 516.479 298.546 515.635C299.85 514.775 300.909 513.563 301.723 511.997C302.536 510.431 302.95 508.406 302.95 505.919Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_189" d="M327.293 509.625C327.293 514.69 326.31 518.228 324.3 521.682C322.289 525.12 319.634 527.898 316.319 529.985C313.004 532.072 309.228 533.576 305.007 534.497C300.771 535.418 297.026 535.879 292.591 535.879H258.303V443.283H287.602C291.179 443.283 297.241 443.652 300.986 444.388C304.731 445.125 308.138 446.399 311.193 448.179C314.247 449.96 316.733 452.385 318.652 455.439C320.57 458.493 321.522 462.376 321.522 467.073C321.522 472.214 320.217 476.543 317.332 479.827C315.383 482.053 313.449 484.14 308.338 487.087V487.348C310.947 487.793 313.418 488.591 315.72 489.773C318.022 490.955 320.033 492.459 321.737 494.285C323.44 496.112 324.791 498.26 325.789 500.701C326.786 503.141 327.293 505.888 327.293 508.943V509.625Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_190" d="M298.561 468.992C298.561 465.845 297.563 463.666 295.568 462.453C293.573 461.241 290.917 460.627 287.602 460.627H279.79V477.986H287.694C288.907 477.986 290.15 477.863 291.455 477.617C292.744 477.372 293.926 476.927 294.985 476.282C296.044 475.637 296.903 474.732 297.563 473.55C298.223 472.368 298.561 470.849 298.561 468.992Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_191" d="M510.688 535.864L502.124 501.146H490.613V535.864H467.406V443.268H502.722C516.49 443.268 521.923 447.105 525.284 449.285C528.645 451.464 531.316 454.349 533.327 457.91C535.337 461.486 536.335 465.937 536.335 471.248C536.335 477.525 533.511 485.215 524.241 493.871L536.872 535.864H510.719H510.688Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_192" d="M513.696 470.757C513.696 466.566 512.468 463.666 510.012 462.039C507.557 460.427 504.288 459.614 500.19 459.614H490.551V482.759H500.297C501.786 482.759 503.336 482.59 504.932 482.252C506.528 481.915 507.987 481.316 509.291 480.472C510.596 479.612 511.655 478.4 512.468 476.834C513.282 475.269 513.696 473.243 513.696 470.757Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_193" d="M654.408 535.925V443.621H677.584V535.925H654.408Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_194" d="M606.721 467.549V536.401H583.546V467.549H560.508V443.805H629.882V467.549H610.167H606.721Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_195" d="M792.25 489.543C792.25 496.495 791.083 502.849 788.781 508.59C786.464 514.345 783.24 519.257 779.127 523.355C775.014 527.453 770.118 530.614 764.439 532.855C758.76 535.096 752.606 536.201 745.975 536.201C739.345 536.201 733.205 535.081 727.573 532.855C721.94 530.614 717.059 527.453 712.946 523.355C708.833 519.257 705.61 514.33 703.292 508.59C700.974 502.834 699.823 496.495 699.823 489.543C699.823 482.59 700.974 476.159 703.292 470.496C705.61 464.832 708.833 460.013 712.946 456.038C717.059 452.062 721.94 449.008 727.573 446.859C733.205 444.711 739.345 443.636 745.975 443.636C752.606 443.636 758.76 444.711 764.439 446.859C770.118 449.008 775.014 452.078 779.127 456.038C783.24 460.013 786.464 464.832 788.781 470.496C791.099 476.159 792.25 482.513 792.25 489.543ZM769.12 489.696C769.12 486.442 768.537 483.403 767.386 480.564C766.25 477.74 764.654 475.315 762.643 473.289C760.617 471.278 758.192 469.682 755.322 468.516C752.467 467.349 749.321 466.766 745.898 466.766C742.476 466.766 739.345 467.349 736.521 468.516C733.697 469.682 731.256 471.278 729.2 473.289C727.143 475.3 725.562 477.725 724.457 480.564C723.352 483.388 722.799 486.442 722.799 489.696C722.799 492.95 723.367 496.219 724.518 499.089C725.654 501.959 727.235 504.415 729.261 506.472C731.272 508.528 733.697 510.14 736.521 511.306C739.345 512.473 742.46 513.056 745.898 513.056C749.336 513.056 752.452 512.473 755.276 511.306C758.1 510.14 760.541 508.528 762.597 506.472C764.654 504.415 766.25 501.959 767.401 499.089C768.537 496.219 769.12 493.088 769.12 489.696Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_196" d="M886.565 535.725H863.788L840.06 489.435L840.459 535.725H816.976V443.421H839.538L862.867 490.095H863.159L862.76 443.421H886.549V532.594L886.565 535.725Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_197" d="M211.073 535.875L202.374 513.194H172.783L164.756 536.477H141.472L176.389 443.36H199.673L234.59 536.477H211.307L211.073 535.875ZM188.177 466.628L176.405 501.545H199.688L188.177 466.628Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_198" d="M752.698 608.375C750.81 606.042 748.523 604.101 745.469 602.72C742.415 601.338 739.468 600.648 736.628 600.648C735.17 600.648 733.681 600.771 732.177 601.016C730.673 601.262 729.323 601.753 728.11 602.459C726.898 603.165 725.9 604.086 725.071 605.206C724.258 606.327 723.843 607.769 723.843 609.519C723.843 611.023 724.166 612.266 724.81 613.279C725.455 614.277 726.406 615.152 727.65 615.904C728.893 616.656 730.382 617.347 732.101 617.976C733.82 618.605 735.753 619.25 737.902 619.91C741.002 620.907 744.226 622.012 747.587 623.225C750.948 624.437 754.002 626.034 756.75 628.044C759.497 630.04 761.784 632.526 763.595 635.488C765.406 638.45 766.312 642.149 766.312 646.57C766.312 651.665 765.345 656.055 763.411 659.769C761.477 663.483 758.868 666.553 755.599 668.962C752.329 671.387 748.584 673.183 744.364 674.35C740.143 675.516 735.799 676.099 731.318 676.099C724.779 676.099 718.456 674.994 712.347 672.784C706.239 670.574 701.159 667.428 697.122 663.33L711.58 649.056C713.821 651.726 716.768 653.952 720.421 655.748C724.073 657.543 727.711 658.434 731.333 658.434C732.96 658.434 734.556 658.265 736.106 657.927C737.657 657.589 739.007 657.052 740.174 656.3C741.34 655.548 742.261 654.551 742.952 653.292C743.642 652.033 743.98 650.545 743.98 648.78C743.98 647.015 743.55 645.695 742.691 644.528C741.831 643.362 740.603 642.303 739.007 641.336C737.411 640.384 735.431 639.509 733.067 638.711C730.704 637.913 728.018 637.069 724.994 636.148C722.063 635.227 719.208 634.153 716.415 632.894C713.621 631.636 711.12 630.04 708.925 628.075C706.73 626.11 704.965 623.731 703.63 620.938C702.294 618.145 701.634 614.737 701.634 610.732C701.634 605.805 702.663 601.599 704.735 598.085C706.807 594.585 709.508 591.7 712.869 589.444C716.231 587.187 720.006 585.545 724.227 584.502C728.448 583.458 732.699 582.936 737.012 582.936C742.169 582.936 747.449 583.857 752.821 585.683C758.192 587.525 762.904 590.226 766.956 593.818L752.882 608.214L752.698 608.375Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_199" d="M464.542 675.125L456.048 652.847H426.457L418.43 676.131H395.147L430.064 583.013H453.347L488.264 676.131H464.981L464.542 675.125ZM441.851 606.296L430.079 641.213H453.363L441.851 606.296Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_200" d="M478.636 394.781L470.153 372.697H440.562L432.535 395.98H409.252L444.169 302.863H467.452L502.369 395.98H479.086L478.636 394.781ZM455.956 326.131L444.184 361.048H467.468L455.956 326.131Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_201" d="M749.229 329.312C747.341 326.98 745.054 325.01 742 323.629C738.946 322.248 735.999 321.557 733.159 321.557C731.701 321.557 730.213 321.68 728.709 321.925C727.204 322.171 725.854 322.662 724.641 323.368C723.429 324.074 722.431 324.995 721.602 326.115C720.789 327.236 720.374 328.679 720.374 330.428C720.374 331.932 720.697 333.176 721.341 334.189C721.986 335.186 722.938 336.061 724.181 336.813C725.424 337.565 726.913 338.256 728.632 338.885C730.351 339.514 732.285 340.159 734.433 340.819C737.534 341.817 740.757 342.922 744.118 344.134C747.479 345.347 750.534 346.943 753.281 348.953C756.028 350.949 758.315 353.435 760.126 356.397C761.937 359.36 762.843 363.058 762.843 367.479C762.843 372.574 761.876 376.964 759.942 380.678C758.008 384.392 755.399 387.462 752.13 389.872C748.861 392.297 745.116 394.092 740.895 395.259C736.674 396.425 732.331 397.009 727.849 397.009C721.311 397.009 714.987 395.904 708.879 393.693C702.77 391.483 697.69 388.337 693.653 384.239L708.111 369.965C710.352 372.636 713.299 374.861 716.952 376.657C720.605 378.453 724.242 379.343 727.864 379.343C729.491 379.343 731.087 379.174 732.638 378.836C734.188 378.499 735.538 377.962 736.705 377.209C737.871 376.457 738.792 375.46 739.483 374.201C740.174 372.943 740.511 371.454 740.511 369.689C740.511 367.924 740.081 366.604 739.222 365.437C738.362 364.271 737.135 363.212 735.538 362.245C733.942 361.293 731.962 360.419 729.599 359.62C727.235 358.822 724.549 357.978 721.526 357.057C718.594 356.136 715.739 355.062 712.946 353.804C710.153 352.545 707.651 350.949 705.456 348.984C703.261 347.02 701.496 344.641 700.161 341.847C698.826 339.054 698.166 335.647 698.166 331.641C698.166 326.714 699.194 322.509 701.266 318.994C703.338 315.494 706.039 312.609 709.401 310.353C712.762 308.097 716.537 306.454 720.758 305.411C724.979 304.367 729.23 303.845 733.543 303.845C738.7 303.845 743.98 304.766 749.352 306.593C754.724 308.434 759.436 311.136 763.487 314.727L749.413 329.124L749.229 329.312Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_202" d="M605.724 372.697V302.863H675.558V326.238H629.022V337.857H652.321V361.109H629.022V372.697H675.558V395.98H605.724V372.697Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_203" d="M560.677 326.606V395.458H537.501V326.606H514.464V302.863H583.837V326.606H565.167H560.677Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_204" d="M289.948 327.859C288.06 325.526 285.776 323.951 282.721 322.57C279.667 321.189 276.72 320.498 273.881 320.498C272.423 320.498 270.934 320.621 269.43 320.866C267.926 321.112 266.575 321.603 265.363 322.309C264.15 323.015 263.153 323.936 262.324 325.056C261.51 326.177 261.096 327.619 261.096 329.369C261.096 330.873 261.418 332.116 262.063 333.129C262.707 334.127 263.659 335.002 264.902 335.754C266.145 336.506 267.634 337.197 269.353 337.826C271.072 338.455 273.006 339.1 275.155 339.76C278.255 340.757 281.478 341.863 284.84 343.075C288.201 344.288 291.255 345.884 294.002 347.894C296.75 349.89 299.037 352.376 300.848 355.338C302.659 358.3 303.564 361.999 303.564 366.42C303.564 371.515 302.597 375.905 300.663 379.619C298.73 383.333 296.12 386.403 292.851 388.813C289.582 391.238 285.837 393.033 281.616 394.2C277.396 395.366 273.052 395.95 268.57 395.95C262.032 395.95 255.709 394.844 249.6 392.634C243.492 390.424 238.411 387.278 234.375 383.18L248.833 368.906C251.074 371.577 254.02 373.802 257.673 375.598C261.326 377.394 264.964 378.284 268.586 378.284C270.213 378.284 271.809 378.115 273.359 377.777C274.909 377.44 276.26 376.902 277.426 376.15C278.593 375.398 279.514 374.401 280.204 373.142C280.895 371.884 281.233 370.395 281.233 368.63C281.233 366.865 280.803 365.545 279.943 364.378C279.084 363.212 277.856 362.153 276.26 361.186C274.664 360.234 272.684 359.359 270.32 358.561C267.957 357.763 265.271 356.919 262.247 355.998C259.316 355.077 256.461 354.003 253.667 352.744C250.874 351.486 248.372 349.89 246.178 347.925C243.983 345.961 242.218 343.582 240.882 340.788C239.547 337.995 238.887 334.588 238.887 330.582C238.887 325.655 239.915 321.449 241.987 317.935C244.059 314.435 246.761 311.55 250.122 309.294C253.483 307.038 257.259 305.395 261.48 304.352C265.7 303.308 269.952 302.786 274.265 302.786C279.422 302.786 284.701 303.707 290.073 305.533C295.445 307.375 300.157 310.077 304.209 313.668L290.135 328.065L289.948 327.859Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_205" d="M373.951 326.606V395.458H350.775V326.606H327.738V302.863H397.112V326.606H385.524H378.729H373.951Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_206" d="M604.235 652.847V583.013H674.069V606.388H627.534V618.007H650.832V641.259H627.534V652.847H674.069V676.131H604.235V652.847Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_207" d="M354.259 676.131V610.241H353.86L329.656 676.131H313.878L290.334 610.241H289.935L290.457 676.131H269.277V583.013H301.278L322.473 642.718H322.995L343.27 583.013H375.793V676.131H358.104H354.259Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
			<path id="Vector_208" d="M509.046 674.188V656.623L553.371 601.937H510.105V582.998H581.52V601.016L536.15 656.653H582.441V676.115H509.046V674.188Z" stroke="#B0A380" stroke-width="3" stroke-miterlimit="10"/>
		</g>
		{#if step === 5}
			<g id="title-bold">
				<path
					in:draw={drawParams}
					id="Vector_209"
					d="M325.282 238.815C323.624 242.744 321.276 246.105 318.207 248.914C315.137 251.723 311.438 253.902 307.11 255.483C302.782 257.048 297.962 257.831 292.667 257.831C287.372 257.831 282.461 257.048 278.163 255.483C273.866 253.917 270.228 251.723 267.235 248.914C264.242 246.105 261.94 242.744 260.329 238.815C258.717 234.886 257.919 230.527 257.919 225.754V164.714H281.217V209.177C281.217 211.342 281.709 222.914 282.077 224.909C282.875 229.13 284.563 235.116 292.775 235.116C300.986 235.116 302.997 229.406 303.718 224.909C304.04 222.914 304.516 211.357 304.516 209.177V164.714H327.753V225.754C327.753 230.542 326.924 234.901 325.282 238.815Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_210"
					d="M397.603 257.831L374.12 211.127L374.519 257.831H351.036V164.714H374.32L397.603 215.117V164.714H420.886V257.831H397.603Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_211"
					d="M444.154 257.831V164.714H467.437V257.831H444.154Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_212"
					d="M537.225 187.89V257.831H513.896V187.89H490.705V164.714H560.539V187.89H539.417H537.225Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_213"
					d="M583.837 257.831V164.714H653.672V188.166H611.771V199.815H630.388V223.144H611.771V235.039H653.672V257.831H583.837Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_214"
					d="M758.96 211.004C758.96 219.154 757.763 226.199 755.368 232.108C752.974 238.032 749.812 242.898 745.883 246.704C741.954 250.526 737.534 253.319 732.592 255.115C727.665 256.911 721.173 257.816 716.108 257.816H676.955V164.699H711.856C717.059 164.699 727.097 165.466 732.177 167.001C737.242 168.536 741.77 171.084 745.73 174.629C749.69 178.174 752.882 182.932 755.322 188.903C757.747 194.873 758.975 202.225 758.975 211.004H758.96ZM735.4 211.649C735.4 207.136 734.725 203.391 733.374 200.429C732.024 197.452 730.213 195.088 727.957 193.323C725.7 191.558 723.122 190.299 720.252 189.547C717.366 188.795 702.939 188.427 699.869 188.427V235.131H711.749C714.941 235.131 717.182 234.732 720.144 233.95C723.091 233.167 725.7 231.862 727.957 230.051C730.213 228.24 732.024 225.846 733.374 222.838C734.725 219.829 735.4 216.115 735.4 211.664V211.649Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_215"
					d="M443.417 489.205C443.417 496.158 442.25 502.512 439.948 508.252C437.631 514.008 434.407 518.919 430.294 523.017C426.181 527.115 421.285 530.277 415.606 532.518C409.927 534.759 403.773 535.864 397.142 535.864C390.512 535.864 384.373 534.743 378.74 532.518C373.107 530.277 368.226 527.115 364.113 523.017C360 518.919 356.776 513.992 354.459 508.252C352.141 502.497 350.99 496.158 350.99 489.205C350.99 482.252 352.141 475.822 354.459 470.158C356.776 464.495 360 459.675 364.113 455.7C368.226 451.725 373.107 448.671 378.74 446.522C384.373 444.373 390.512 443.299 397.142 443.299C403.773 443.299 409.927 444.373 415.606 446.522C421.285 448.671 426.181 451.74 430.294 455.7C434.407 459.675 437.631 464.495 439.948 470.158C442.266 475.822 443.417 482.176 443.417 489.205ZM420.272 489.359C420.272 486.105 419.704 483.066 418.553 480.227C417.417 477.402 415.821 474.977 413.81 472.951C411.784 470.941 409.359 469.345 406.489 468.178C403.619 467.012 400.488 466.429 397.065 466.429C393.643 466.429 390.512 467.012 387.688 468.178C384.864 469.345 382.423 470.941 380.367 472.951C378.31 474.962 376.729 477.387 375.624 480.227C374.519 483.051 373.966 486.105 373.966 489.359C373.966 492.612 374.534 495.882 375.685 498.752C376.821 501.622 378.402 504.078 380.428 506.134C382.439 508.191 384.864 509.802 387.688 510.969C390.512 512.135 393.627 512.719 397.065 512.719C400.503 512.719 403.619 512.135 406.443 510.969C409.267 509.802 411.708 508.191 413.764 506.134C415.821 504.078 417.417 501.622 418.568 498.752C419.704 495.882 420.272 493.204 420.272 489.812V489.359Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_216"
					d="M302.95 505.919C302.95 501.729 301.723 498.828 299.267 497.201C296.811 495.59 293.542 494.776 289.444 494.776H279.805V517.921H289.552C291.04 517.921 292.59 517.753 294.187 517.415C295.783 517.077 297.241 516.479 298.546 515.635C299.85 514.775 300.909 513.563 301.723 511.997C302.536 510.431 302.95 508.406 302.95 505.919Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
					<path
						in:draw={drawParams}
						id="Vector_217"
						d="M327.293 509.625C327.293 514.69 326.31 518.228 324.3 521.682C322.289 525.12 319.634 527.898 316.319 529.985C313.004 532.072 309.228 533.576 305.007 534.497C300.771 535.418 297.026 535.879 292.591 535.879H258.303V443.283H287.602C291.179 443.283 297.241 443.652 300.986 444.388C304.731 445.125 308.138 446.399 311.193 448.179C314.247 449.96 316.733 452.385 318.652 455.439C320.57 458.493 321.522 462.376 321.522 467.073C321.522 472.214 320.217 476.543 317.332 479.827C315.383 482.053 313.449 484.14 308.338 487.087V487.348C310.947 487.793 313.418 488.591 315.72 489.773C318.022 490.955 320.033 492.459 321.737 494.285C323.44 496.112 324.791 498.26 325.789 500.701C326.786 503.141 327.293 505.888 327.293 508.943V509.625Z"
						stroke="#6B50DC"
						stroke-width="5" stroke-miterlimit="10"
					/>
					<path
						in:draw={drawParams}
						id="Vector_218"
						d="M298.561 468.992C298.561 465.845 297.563 463.666 295.568 462.453C293.573 461.241 290.917 460.627 287.602 460.627H279.79V477.986H287.694C288.907 477.986 290.15 477.863 291.455 477.617C292.744 477.372 293.926 476.927 294.985 476.282C296.044 475.637 296.903 474.732 297.563 473.55C298.223 472.368 298.561 470.849 298.561 468.992Z"
						stroke="#6B50DC"
						stroke-width="5" stroke-miterlimit="10"
					/>
					<path
						in:draw={drawParams}
						id="Vector_219"
						d="M510.688 535.864L502.124 501.146H490.613V535.864H467.406V443.268H502.722C516.49 443.268 521.923 447.105 525.284 449.285C528.645 451.464 531.316 454.349 533.327 457.91C535.337 461.486 536.335 465.937 536.335 471.248C536.335 477.525 533.511 485.215 524.241 493.871L536.872 535.864H510.719H510.688Z"
						stroke="#6B50DC"
						stroke-width="5" stroke-miterlimit="10"
					/>
					<path
						in:draw={drawParams}
						id="Vector_220"
						d="M513.696 470.757C513.696 466.566 512.468 463.666 510.012 462.039C507.557 460.427 504.288 459.614 500.19 459.614H490.551V482.759H500.297C501.786 482.759 503.336 482.59 504.932 482.252C506.528 481.915 507.987 481.316 509.291 480.472C510.596 479.612 511.655 478.4 512.468 476.834C513.282 475.269 513.696 473.243 513.696 470.757Z"
						stroke="#6B50DC"
						stroke-width="5" stroke-miterlimit="10"
					/>
					<path
						in:draw={drawParams}
						id="Vector_221"
						d="M654.408 535.925V443.621H677.584V535.925H654.408Z"
						stroke="#6B50DC"
						stroke-width="5" stroke-miterlimit="10"
					/>
				<path
					in:draw={drawParams}
					id="Vector_222"
					d="M606.721 467.549V536.401H583.546V467.549H560.508V443.805H629.882V467.549H610.167H606.721Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_223"
					d="M792.25 489.543C792.25 496.495 791.083 502.849 788.781 508.59C786.464 514.345 783.24 519.257 779.127 523.355C775.014 527.453 770.118 530.614 764.439 532.855C758.76 535.096 752.606 536.201 745.975 536.201C739.345 536.201 733.205 535.081 727.573 532.855C721.94 530.614 717.059 527.453 712.946 523.355C708.833 519.257 705.61 514.33 703.292 508.59C700.974 502.834 699.823 496.495 699.823 489.543C699.823 482.59 700.974 476.159 703.292 470.496C705.61 464.832 708.833 460.013 712.946 456.038C717.059 452.062 721.94 449.008 727.573 446.859C733.205 444.711 739.345 443.636 745.975 443.636C752.606 443.636 758.76 444.711 764.439 446.859C770.118 449.008 775.014 452.078 779.127 456.038C783.24 460.013 786.464 464.832 788.781 470.496C791.099 476.159 792.25 482.513 792.25 489.543ZM769.12 489.696C769.12 486.442 768.537 483.403 767.386 480.564C766.25 477.74 764.654 475.315 762.643 473.289C760.617 471.278 758.192 469.682 755.322 468.516C752.467 467.349 749.321 466.766 745.898 466.766C742.476 466.766 739.345 467.349 736.521 468.516C733.697 469.682 731.256 471.278 729.2 473.289C727.143 475.3 725.562 477.725 724.457 480.564C723.352 483.388 722.799 486.442 722.799 489.696C722.799 492.95 723.367 496.219 724.518 499.089C725.654 501.959 727.235 504.415 729.261 506.472C731.272 508.528 733.697 510.14 736.521 511.306C739.345 512.473 742.46 513.056 745.898 513.056C749.336 513.056 752.452 512.473 755.276 511.306C758.1 510.14 760.541 508.528 762.597 506.472C764.654 504.415 766.25 501.959 767.401 499.089C768.537 496.219 769.12 493.088 769.12 489.696Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_224"
					d="M886.565 535.725H863.788L840.06 489.435L840.459 535.725H816.976V443.421H839.538L862.867 490.095H863.159L862.76 443.421H886.549V532.594L886.565 535.725Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_225"
					d="M211.073 535.875L202.374 513.194H172.783L164.756 536.477H141.472L176.389 443.36H199.673L234.59 536.477H211.307L211.073 535.875ZM188.177 466.628L176.405 501.545H199.688L188.177 466.628Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_226"
					d="M752.698 608.375C750.81 606.042 748.523 604.101 745.469 602.72C742.415 601.338 739.468 600.648 736.628 600.648C735.17 600.648 733.681 600.771 732.177 601.016C730.673 601.262 729.323 601.753 728.11 602.459C726.898 603.165 725.9 604.086 725.071 605.206C724.258 606.327 723.843 607.769 723.843 609.519C723.843 611.023 724.166 612.266 724.81 613.279C725.455 614.277 726.406 615.152 727.65 615.904C728.893 616.656 730.382 617.347 732.101 617.976C733.82 618.605 735.753 619.25 737.902 619.91C741.002 620.907 744.226 622.012 747.587 623.225C750.948 624.437 754.002 626.034 756.75 628.044C759.497 630.04 761.784 632.526 763.595 635.488C765.406 638.45 766.312 642.149 766.312 646.57C766.312 651.665 765.345 656.055 763.411 659.769C761.477 663.483 758.868 666.553 755.599 668.962C752.329 671.387 748.584 673.183 744.364 674.35C740.143 675.516 735.799 676.099 731.318 676.099C724.779 676.099 718.456 674.994 712.347 672.784C706.239 670.574 701.159 667.428 697.122 663.33L711.58 649.056C713.821 651.726 716.768 653.952 720.421 655.748C724.073 657.543 727.711 658.434 731.333 658.434C732.96 658.434 734.556 658.265 736.106 657.927C737.657 657.589 739.007 657.052 740.174 656.3C741.34 655.548 742.261 654.551 742.952 653.292C743.642 652.033 743.98 650.545 743.98 648.78C743.98 647.015 743.55 645.695 742.691 644.528C741.831 643.362 740.603 642.303 739.007 641.336C737.411 640.384 735.431 639.509 733.067 638.711C730.704 637.913 728.018 637.069 724.994 636.148C722.063 635.227 719.208 634.153 716.415 632.894C713.621 631.636 711.12 630.04 708.925 628.075C706.73 626.11 704.965 623.731 703.63 620.938C702.294 618.145 701.634 614.737 701.634 610.732C701.634 605.805 702.663 601.599 704.735 598.085C706.807 594.585 709.508 591.7 712.869 589.444C716.231 587.187 720.006 585.545 724.227 584.502C728.448 583.458 732.699 582.936 737.012 582.936C742.169 582.936 747.449 583.857 752.821 585.683C758.192 587.525 762.904 590.226 766.956 593.818L752.882 608.214L752.698 608.375Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_227"
					d="M464.542 675.125L456.048 652.847H426.457L418.43 676.131H395.147L430.064 583.013H453.347L488.264 676.131H464.981L464.542 675.125ZM441.851 606.296L430.079 641.213H453.363L441.851 606.296Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_228"
					d="M478.636 394.781L470.153 372.697H440.562L432.535 395.98H409.252L444.169 302.863H467.452L502.369 395.98H479.086L478.636 394.781ZM455.956 326.131L444.184 361.048H467.468L455.956 326.131Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
					<path
						in:draw={drawParams}
						id="Vector_229"
						d="M749.229 329.312C747.341 326.98 745.054 325.01 742 323.629C738.946 322.248 735.999 321.557 733.159 321.557C731.701 321.557 730.213 321.68 728.709 321.925C727.204 322.171 725.854 322.662 724.641 323.368C723.429 324.074 722.431 324.995 721.602 326.115C720.789 327.236 720.374 328.679 720.374 330.428C720.374 331.932 720.697 333.176 721.341 334.189C721.986 335.186 722.938 336.061 724.181 336.813C725.424 337.565 726.913 338.256 728.632 338.885C730.351 339.514 732.285 340.159 734.433 340.819C737.534 341.817 740.757 342.922 744.118 344.134C747.479 345.347 750.534 346.943 753.281 348.953C756.028 350.949 758.315 353.435 760.126 356.397C761.937 359.36 762.843 363.058 762.843 367.479C762.843 372.574 761.876 376.964 759.942 380.678C758.008 384.392 755.399 387.462 752.13 389.872C748.861 392.297 745.116 394.092 740.895 395.259C736.674 396.425 732.331 397.009 727.849 397.009C721.311 397.009 714.987 395.904 708.879 393.693C702.77 391.483 697.69 388.337 693.653 384.239L708.111 369.965C710.352 372.636 713.299 374.861 716.952 376.657C720.605 378.453 724.242 379.343 727.864 379.343C729.491 379.343 731.087 379.174 732.638 378.836C734.188 378.499 735.538 377.962 736.705 377.209C737.871 376.457 738.792 375.46 739.483 374.201C740.174 372.943 740.511 371.454 740.511 369.689C740.511 367.924 740.081 366.604 739.222 365.437C738.362 364.271 737.135 363.212 735.538 362.245C733.942 361.293 731.962 360.419 729.599 359.62C727.235 358.822 724.549 357.978 721.526 357.057C718.594 356.136 715.739 355.062 712.946 353.804C710.153 352.545 707.651 350.949 705.456 348.984C703.261 347.02 701.496 344.641 700.161 341.847C698.826 339.054 698.166 335.647 698.166 331.641C698.166 326.714 699.194 322.509 701.266 318.994C703.338 315.494 706.039 312.609 709.401 310.353C712.762 308.097 716.537 306.454 720.758 305.411C724.979 304.367 729.23 303.845 733.543 303.845C738.7 303.845 743.98 304.766 749.352 306.593C754.724 308.434 759.436 311.136 763.487 314.727L749.413 329.124L749.229 329.312Z"
						stroke="#6B50DC"
						stroke-width="5" stroke-miterlimit="10"
					/>
					<path
						in:draw={drawParams}
						id="Vector_230"
						d="M605.724 372.697V302.863H675.558V326.238H629.022V337.857H652.321V361.109H629.022V372.697H675.558V395.98H605.724V372.697Z"
						stroke="#6B50DC"
						stroke-width="5" stroke-miterlimit="10"
					/>
					<path
						in:draw={drawParams}
						id="Vector_231"
						d="M560.677 326.606V395.458H537.501V326.606H514.464V302.863H583.837V326.606H565.167H560.677Z"
						stroke="#6B50DC"
						stroke-width="5" stroke-miterlimit="10"
					/>
				<path
					in:draw={drawParams}
					id="Vector_232"
					d="M289.948 327.859C288.06 325.526 285.776 323.951 282.721 322.57C279.667 321.189 276.72 320.498 273.881 320.498C272.423 320.498 270.934 320.621 269.43 320.866C267.926 321.112 266.575 321.603 265.363 322.309C264.15 323.015 263.153 323.936 262.324 325.056C261.51 326.177 261.096 327.619 261.096 329.369C261.096 330.873 261.418 332.116 262.063 333.129C262.707 334.127 263.659 335.002 264.902 335.754C266.145 336.506 267.634 337.197 269.353 337.826C271.072 338.455 273.006 339.1 275.155 339.76C278.255 340.757 281.478 341.863 284.84 343.075C288.201 344.288 291.255 345.884 294.002 347.894C296.75 349.89 299.037 352.376 300.848 355.338C302.659 358.3 303.564 361.999 303.564 366.42C303.564 371.515 302.597 375.905 300.663 379.619C298.73 383.333 296.12 386.403 292.851 388.813C289.582 391.238 285.837 393.033 281.616 394.2C277.396 395.366 273.052 395.95 268.57 395.95C262.032 395.95 255.709 394.844 249.6 392.634C243.492 390.424 238.411 387.278 234.375 383.18L248.833 368.906C251.074 371.577 254.02 373.802 257.673 375.598C261.326 377.394 264.964 378.284 268.586 378.284C270.213 378.284 271.809 378.115 273.359 377.777C274.909 377.44 276.26 376.902 277.426 376.15C278.593 375.398 279.514 374.401 280.204 373.142C280.895 371.884 281.233 370.395 281.233 368.63C281.233 366.865 280.803 365.545 279.943 364.378C279.084 363.212 277.856 362.153 276.26 361.186C274.664 360.234 272.684 359.359 270.32 358.561C267.957 357.763 265.271 356.919 262.247 355.998C259.316 355.077 256.461 354.003 253.667 352.744C250.874 351.486 248.372 349.89 246.178 347.925C243.983 345.961 242.218 343.582 240.882 340.788C239.547 337.995 238.887 334.588 238.887 330.582C238.887 325.655 239.915 321.449 241.987 317.935C244.059 314.435 246.761 311.55 250.122 309.294C253.483 307.038 257.259 305.395 261.48 304.352C265.7 303.308 269.952 302.786 274.265 302.786C279.422 302.786 284.701 303.707 290.073 305.533C295.445 307.375 300.157 310.077 304.209 313.668L290.135 328.065L289.948 327.859Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_233"
					d="M373.951 326.606V395.458H350.775V326.606H327.738V302.863H397.112V326.606H385.524H378.729H373.951Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_234"
					d="M604.235 652.847V583.013H674.069V606.388H627.534V618.007H650.832V641.259H627.534V652.847H674.069V676.131H604.235V652.847Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_235"
					d="M354.259 676.131V610.241H353.86L329.656 676.131H313.878L290.334 610.241H289.935L290.457 676.131H269.277V583.013H301.278L322.473 642.718H322.995L343.27 583.013H375.793V676.131H358.104H354.259Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_236"
					d="M509.046 674.188V656.623L553.371 601.937H510.105V582.998H581.52V601.016L536.15 656.653H582.441V676.115H509.046V674.188Z"
					stroke="#6B50DC"
					stroke-width="5" stroke-miterlimit="10"
				/>
			</g>
		{/if}
		<g id="of" class:visible={step === 5}>
			<path id="Vector_237" d="M811.527 433.445C834.804 433.445 853.673 414.576 853.673 391.299C853.673 368.023 834.804 349.153 811.527 349.153C788.251 349.153 769.381 368.023 769.381 391.299C769.381 414.576 788.251 433.445 811.527 433.445Z" fill="#1C1246"/>
			<path id="Vector_238" d="M790.854 391.176C790.854 389.519 791.145 388.03 791.728 386.695C792.312 385.359 793.11 384.224 794.138 383.287C795.166 382.351 796.379 381.63 797.776 381.123C799.172 380.617 800.692 380.356 802.334 380.356C803.976 380.356 805.496 380.617 806.892 381.123C808.289 381.63 809.517 382.351 810.545 383.287C811.574 384.224 812.387 385.359 812.97 386.695C813.553 388.03 813.845 389.519 813.845 391.176C813.845 392.834 813.553 394.338 812.97 395.704C812.387 397.07 811.574 398.237 810.545 399.188C809.517 400.155 808.289 400.892 806.892 401.429C805.496 401.966 803.976 402.212 802.334 402.212C800.692 402.212 799.172 401.951 797.776 401.429C796.379 400.907 795.166 400.155 794.138 399.188C793.11 398.221 792.312 397.055 791.728 395.704C791.145 394.338 790.854 392.834 790.854 391.176ZM798.251 391.176C798.251 391.852 798.359 392.481 798.558 393.049C798.758 393.617 799.049 394.108 799.402 394.507C799.755 394.906 800.201 395.228 800.707 395.459C801.214 395.689 801.751 395.796 802.349 395.796C802.948 395.796 803.47 395.689 803.976 395.459C804.483 395.228 804.912 394.921 805.281 394.507C805.649 394.093 805.941 393.617 806.14 393.049C806.34 392.481 806.447 391.867 806.447 391.176C806.447 390.486 806.34 389.903 806.14 389.35C805.941 388.797 805.649 388.322 805.281 387.953C804.912 387.57 804.483 387.278 803.976 387.063C803.485 386.848 802.933 386.741 802.349 386.741C801.766 386.741 801.214 386.848 800.707 387.063C800.201 387.278 799.771 387.57 799.402 387.953C799.034 388.337 798.758 388.797 798.558 389.35C798.359 389.903 798.251 390.516 798.251 391.176Z" fill="white"/>
			<path id="Vector_239" d="M825.034 388.936H831.342V394.63H825.064V401.644H818.234V380.955H832.201V386.772H825.049V388.936H825.034Z" fill="white"/>
		</g>
		<g id="the" class:visible={step === 5}>
			<path id="Vector_240" d="M211.184 183.101C240.631 183.101 264.503 159.229 264.503 129.782C264.503 100.334 240.631 76.4624 211.184 76.4624C181.736 76.4624 157.864 100.334 157.864 129.782C157.864 159.229 181.736 183.101 211.184 183.101Z" fill="#1C1246"/>
			<path id="Vector_241" d="M192.029 140.71H184.678V125.055H179.306V118.854H197.401V125.055H192.029V140.71Z" fill="white"/>
			<path id="Vector_242" d="M214.53 132.422H208.544V140.725H201.192V118.869H208.513V126.282H214.499V118.869H221.881V140.725H214.53V132.422Z" fill="white"/>
			<path id="Vector_243" d="M227.499 118.854H242.525V124.963H234.405V126.85H242.033V132.56H234.405V134.601H243.046V140.71H227.483V118.854H227.499Z" fill="white"/>
		</g>
	</svg>
</div>

<style>
	.maze {
		width: calc(100% - 350px);
		margin-left: 350px;
		height: 100%;
		position: relative;
	}
	.svg-wrapper {
		width: 100%;
		height: 100%;
		transform-origin: top left;
		transition: transform 1s ease-in;
	}
	.maze svg {
		position: absolute;
		top: 0;
		left: 0;
	}
	#intro-maze-path {
		left: -350px;
	}
	#path {
		opacity: 1;
		transition: stroke-dashoffset calc(var(--1s) * 2) ease;
	}
	#path.visible {
		opacity: 1;
	}
	#of,
	#the {
		opacity: 0;
		transition: opacity var(--1s);
	}
	#of.visible,
	#the.visible {
		opacity: 1;
	}

	@media (max-width: 600px) {
		.maze {
			height: 100vh;
		}
	}
</style>
