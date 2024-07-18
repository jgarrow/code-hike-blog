import { Block, CodeBlock, parseProps } from "codehike/blocks"
import { z } from "zod"
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection"
import { Code } from "@/components/code"

const Schema = Block.extend({
  steps: z.array(Block.extend({ code: CodeBlock })),
})

export function Scrollycoding(props: unknown) {
  const { steps } = parseProps(props, Schema)
  return (
    <SelectionProvider className="flex gap-4 mt-5 !col-start-1 col-span-3">
      <div className="flex-1 mt-32 mb-[90vh] ml-2 prose w-1/2">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click", "scroll"]}
            className="border border-editorGroup-border border-l-4 data-[selected=true]:border-blue-400 px-5 py-2 mb-24 rounded"
          >
            <h2 className="mt-4 text-xl">{step.title}</h2>
            <div>{step.children}</div>
          </Selectable>
        ))}
      </div>

      <div className="w-1/2">
        <div className="top-20 sticky overflow-auto">
          <Selection
            from={steps.map((step) => (
              <Code
                codeblock={step.code}
                className="my-0 max-h-[calc(100vh-6rem)] h-screen bg-transparent overflow-auto"
              />
            ))}
          />
        </div>
      </div>
    </SelectionProvider>
  )
}
