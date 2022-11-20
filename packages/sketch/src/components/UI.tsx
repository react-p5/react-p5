import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  forwardRef,
  HStack,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack
} from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"

export interface UIValue {
  label: string
  value: number
  setValue: Dispatch<SetStateAction<number>>
  max?: number
}

export interface UIProps {
  values?: UIValue[]
  title?: string
}

export const UI = forwardRef<UIProps, "div">(({ values, title }, ref) => {
  return (
    <Accordion
      ref={ref}
      position="absolute"
      maxW="max-content"
      minW="20ch"
      mt={6}
      ml={6}
      p={3}
      bg="white"
      borderRadius={8}
      borderWidth={1}
      borderColor="gray.200"
      boxShadow="md"
      allowToggle
      transition="opacity 200ms ease-out"
    >
      <AccordionItem border="none">
        <AccordionButton>
          <Box flex={1} textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <VStack align="stretch" spacing={6}>
            {values?.map((v, i) => {
              const { label, value, setValue, max } = v

              return (
                <VStack key={i} align="stretch">
                  <HStack>
                    <Text whiteSpace="nowrap">{label}:</Text>
                    <Input
                      type="number"
                      value={value}
                      onChange={e => setValue(parseInt(e.target.value))}
                      maxW={`${Math.floor(value.toString().length * 2)}ch`}
                      p={0}
                      textAlign="center"
                    />
                  </HStack>
                  <Slider
                    colorScheme="red"
                    focusThumbOnChange={false}
                    defaultValue={value}
                    value={value}
                    max={max}
                    onChange={v => setValue(v)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>
              )
            })}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
})
