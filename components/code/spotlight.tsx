// import { z } from "zod"
// import {
//   Selection,
//   Selectable,
//   SelectionProvider,
// } from "codehike/utils/selection"
// import { Block, CodeBlock, parseProps } from "codehike/blocks"
// import { RawCode, highlight } from "codehike/code"
// import { SmoothPre } from "@/components/smooth-pre"
// import { extractFlags, getHandlers } from "@/components/code"
// import { tokenTransitions } from "../annotations/token-transitions"
// import theme from "@/theme.mjs"

// const Schema = Block.extend({
//   steps: z.array(Block.extend({ code: CodeBlock })),
// })

// export function Spotlight(props: unknown) {
//   const { steps } = parseProps(props, Schema)
//   return (
//     <SelectionProvider className="flex gap-4 !col-start-1 col-span-3">
//       <div className="flex-1 mt-32 mb-[90vh] ml-2 prose w-1/2">
//         {steps.map((step, i) => (
//           <Selectable
//             key={i}
//             index={i}
//             selectOn={["click"]}
//             className="border border-editorGroup-border border-l-4 data-[selected=true]:border-blue-400 px-5 py-2 mb-4 rounded cursor-pointer hover:bg-zinc-100 transition-colors duration-200 ease-in-out"
//           >
//             <h2 className="text-xl">{step.title}</h2>
//             <div>{step.children}</div>
//           </Selectable>
//         ))}
//       </div>
//       <div className="w-1/2">
//         <div className="top-20 sticky overflow-auto h-full p-4">
//           <Selection
//             from={steps.map((step) => (
//               <Code codeblock={step.code} />
//             ))}
//           />
//         </div>
//       </div>
//     </SelectionProvider>
//   )
// }

// async function Code({ codeblock }: { codeblock: RawCode }) {
//   const highlighted = await highlight(codeblock, theme)
//   // const { flags } = extractFlags(highlighted)

//   return (
//     <SmoothPre
//       code={highlighted}
//       // handlers={getHandlers(flags)}
//       handlers={[tokenTransitions]}
//       className="my-0 max-h-[calc(100vh-6rem)] h-screen bg-transparent m-0 border border-zinc-700"
//     />
//   )
// }

import { Block, CodeBlock, parseProps } from "codehike/blocks"
import { z } from "zod"
// import { Pre, RawCode, highlight } from "codehike/code"
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection"
// import { tokenTransitions } from "@/components/annotations/token-transitions"
// import theme from "@/theme.mjs"
// import { SmoothPre } from "../smooth-pre"
import { Code } from "@/components/code"
import { cn } from "@/lib/utils"

const Schema = Block.extend({
  steps: z.array(Block.extend({ code: CodeBlock })),
})

export function Spotlight({
  className,
  ...rest
}: {
  className: string
  rest: unknown
}) {
  const { steps } = parseProps(rest, Schema)
  return (
    <SelectionProvider
      className={cn("flex !col-start-1 col-span-3", className)}
    >
      <div className="flex-1 mt-4 ml-2 prose-h2:mt-4 w-1/2">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click"]}
            className="border border-editorGroup-border border-l-4 data-[selected=true]:border-blue-400 px-5 py-2 mb-4 rounded cursor-pointer hover:bg-zinc-100 transition-colors duration-200 ease-in-out"
          >
            <h2 className="mt-4 text-xl">{step.title}</h2>
            <div>{step.children}</div>
          </Selectable>
        ))}
      </div>
      <div className="w-1/2">
        <div className="top-20 sticky overflow-auto h-full p-4">
          <Selection
            from={steps.map((step) => (
              <Code
                codeblock={step.code}
                className="my-0 max-h-[calc(100vh-6rem)] bg-transparent overflow-auto"
              />
            ))}
          />
        </div>
      </div>
    </SelectionProvider>
  )
}

// async function SmoothCode({ codeblock }: { codeblock: RawCode }) {
//   const highlighted = await highlight(
//     codeblock,
//     theme,
//   )
//   return (
//     <SmoothPre
//       code={highlighted}
//       className="max-h-[90vh] min-h-[38rem] bg-transparent h-full m-0 border border-zinc-700 "
//       handlers={[tokenTransitions]}
//     />
//   )
// }
