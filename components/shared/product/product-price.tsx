import { cn } from "@/lib/utils";

const ProductPrice = ({value, className}:{value: number; className?: string}) => {
    // Format number to two decimal places
    const stringValue = value.toFixed(2);
    // Split into integer and decimal parts
    const [integerPart, decimalPart] = stringValue.split(".");
    return ( 
        <p className={cn("text-2xl", className)}>
            <span className="text-xs align-super">$</span>
            {integerPart}
            <span className="text-xs align-super">.{decimalPart}</span>

        </p>
     );
}

export default ProductPrice;