"use client";

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { CalculatorFormInput } from '@/types';
import { VIEWING_DISTANCE_OPTIONS, PREFERRED_CANVAS_WIDTH_OPTIONS, type ViewingDistance, type PreferredCanvasWidth } from '@/lib/constants';
import { ArrowLeftRight, ArrowUpDown, Settings2, Eye, Palette, Calculator } from 'lucide-react';

const formSchema = z.object({
  pixelWidth: z.coerce.number().positive({ message: "宽度必须大于0" }).int({ message: "宽度必须是整数" }),
  pixelHeight: z.coerce.number().positive({ message: "高度必须大于0" }).int({ message: "高度必须是整数" }),
  diagonalSize: z.coerce.number().positive({ message: "尺寸必须大于0" }),
  viewingDistance: z.enum(VIEWING_DISTANCE_OPTIONS.map(opt => opt.value) as [ViewingDistance, ...ViewingDistance[]], {
    errorMap: () => ({ message: "请选择使用距离" }),
  }),
  preferredCanvasWidth: z.enum(PREFERRED_CANVAS_WIDTH_OPTIONS.map(opt => opt.value) as [PreferredCanvasWidth, ...PreferredCanvasWidth[]], {
    errorMap: () => ({ message: "请选择习惯宽度" }),
  }),
});

interface CalculatorFormProps {
  onSubmit: (data: CalculatorFormInput) => void;
  initialValues?: Partial<CalculatorFormInput>;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onSubmit, initialValues }) => {
  const form = useForm<CalculatorFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pixelWidth: initialValues?.pixelWidth || 1920,
      pixelHeight: initialValues?.pixelHeight || 1080,
      diagonalSize: initialValues?.diagonalSize || 27,
      viewingDistance: initialValues?.viewingDistance || 'medium',
      preferredCanvasWidth: initialValues?.preferredCanvasWidth || '375',
    },
    mode: 'onChange', // Recalculate on change
  });

  const handleFormSubmit: SubmitHandler<CalculatorFormInput> = (data) => {
    onSubmit(data);
  };

  React.useEffect(() => {
    const subscription = form.watch((values) => {
      // Check if form is valid before submitting automatically
      form.trigger().then(isValid => {
        if (isValid) {
          onSubmit(values as CalculatorFormInput);
        }
      });
    });
    // Initial calculation with default values
    form.trigger().then(isValid => {
        if (isValid) {
          onSubmit(form.getValues() as CalculatorFormInput);
        }
      });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);


  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">输入参数</CardTitle>
        <CardDescription className="text-center">
          请填写屏幕信息和您的设计偏好。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pixelWidth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><ArrowLeftRight className="w-4 h-4 mr-2 text-primary" />屏幕像素宽度</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="例如: 1920" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pixelHeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><ArrowUpDown className="w-4 h-4 mr-2 text-primary" />屏幕像素高度</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="例如: 1080" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="diagonalSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Settings2 className="w-4 h-4 mr-2 text-primary" />屏幕尺寸 (英寸)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="例如: 27" {...field} />
                  </FormControl>
                  <FormDescription>屏幕对角线长度，单位为英寸。</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="viewingDistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Eye className="w-4 h-4 mr-2 text-primary" />屏幕使用距离</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择使用距离" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {VIEWING_DISTANCE_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredCanvasWidth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Palette className="w-4 h-4 mr-2 text-primary" />习惯的设计稿宽度</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择习惯宽度" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PREFERRED_CANVAS_WIDTH_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>您通常在哪种倍数的画布上设计App界面。</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* The form submits on change, so explicit button is not strictly needed for calculation */}
            {/* but can be kept for accessibility or as a clear user action. */}
            {/* <Button type="submit" className="w-full font-semibold">
              <Calculator className="w-4 h-4 mr-2" />
              计算
            </Button> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CalculatorForm;
